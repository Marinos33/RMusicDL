import * as React from 'react';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { playlists } from '@src/fakedata';
import { Playlist } from '@src/renderer/types';

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
  }
];

const rows: Playlist[] = playlists;

export const PlaylistsGrid: React.FC = () => {
  return (
    <div style={{ height: 900, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
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