import * as React from 'react';
// eslint-disable-next-line import/named
import { DataGrid, GridApi, GridCellValue, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { playlists } from '@src/fakedata';
import { Playlist } from '@src/renderer/types';
import useWindowDimensions from '@src/renderer/hooks/useWindowDimensions';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { IconButton } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', headerAlign: 'center', flex: 0.2 },
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
    field: 'lastCheck',
    headerName: 'Last Check',
    type: 'Date',
    flex: 1,
    headerAlign: 'center'
  },
  {
    field: 'actions',
    type: 'actions',
    renderCell: (params) => {
      const onClick = (e: any) => {
        e.stopPropagation(); // don't select this row after clicking

        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return (
        <IconButton onClick={onClick}>
          <FileDownloadIcon />
        </IconButton>
      );
    }
  }
];

const rows: Playlist[] = playlists;

export const PlaylistsGrid: React.FC = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div style={{ height: height / 1.3, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar
            }}
            componentsProps={{
              toolbar: { backgroundColor: 'white' }
            }}
            rows={rows}
            columns={columns}
            checkboxSelection
            hideFooter
            onRowClick={(item) => console.log(item.row)}
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistsGrid;
