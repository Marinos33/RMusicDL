import * as React from 'react';
// eslint-disable-next-line import/named
import { DataGrid, GridApi, GridCellValue, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Playlist } from '@src/renderer/types';
import useWindowDimensions from '@src/renderer/hooks/useWindowDimensions';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CircularProgress, IconButton, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToDownloadingList,
  fetchPlaylists,
  removeFromDownloadingList
} from '@src/renderer/redux/playlist/actionCreators';
import { RootState } from '@src/renderer/redux/reducers/rootReducer';

export const PlaylistsGrid: React.FC = () => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const dispatch = useDispatch();
  const playlists = useSelector<RootState, Playlist[]>((state) => state.playlist.playlists);
  const downloadingList = useSelector<RootState, number[]>((state) => state.playlist.downloadingPlaylists);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', headerAlign: 'center', flex: 0.2, hide: true },
    {
      field: 'playlistName',
      headerName: 'Playlist Name',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'lastUpdate',
      headerName: 'Last Updated',
      type: 'Date',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'actions',
      type: 'actions',
      renderCell: (params) => {
        const onClick = async (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

          dispatch(addToDownloadingList(+thisRow.id));
          await window.electronAPI.downloadPlaylist(+thisRow.id);
          await window.electronAPI.refreshPlaylist(+thisRow.id);
          dispatch(removeFromDownloadingList(+thisRow.id));
          dispatch(fetchPlaylists());
        };

        if (downloadingList.includes(+params.id)) {
          return <CircularProgress size={30} />;
        }

        return (
          <IconButton onClick={onClick}>
            <FileDownloadIcon />
          </IconButton>
        );
      }
    }
  ];

  return (
    <div style={{ height: height < width ? height / 1.15 : height / 1.075, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1, backgroundColor: theme.palette.background.paper }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar
            }}
            rows={playlists}
            columns={columns}
            checkboxSelection
            hideFooter
            onRowClick={async (item) => console.log(item.row)}
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistsGrid;
