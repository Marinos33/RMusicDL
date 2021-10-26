import * as React from 'react';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { playlists } from '@src/fakedata';
import { Playlist } from '@src/renderer/types';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', headerAlign: 'center', width: 80 },
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
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        hideFooter
        onRowClick={(item) => console.log(item.row)}
        disableSelectionOnClick
      />
    </div>
  );
};

export default PlaylistsGrid;
