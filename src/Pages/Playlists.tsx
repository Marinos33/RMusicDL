import React from 'react';
import Header from '../components/Playlist/Header';
import { Layout } from 'antd';
import PlaylistsTable from '../components/Playlist/PlaylistsTable';
import AddPlaylistForm from '../components/Playlist/AddPlaylistForm';

interface DataType {
  key: React.Key;
  playlistName: string;
  owner: string;
  lastUpdated: string;
}

const data: DataType[] = [
  {
    key: 1,
    playlistName: 'Playlist 1',
    owner: 'Owner 1',
    // create date to format date to string dd/mm/yyyy - hh:mm:ss
    lastUpdated: new Date('2021-01-01').toLocaleString('en-GB'),
  },
  {
    key: 2,
    playlistName: 'Playlist 2',
    owner: 'Owner 2',
    lastUpdated: new Date('2021-01-02').toLocaleString('en-GB'),
  },
  {
    key: 3,
    playlistName: 'Playlist 3',
    owner: 'Owner 3',
    lastUpdated: new Date('2021-01-03').toLocaleString('en-GB'),
  },
  {
    key: 4,
    playlistName: 'Playlist 4',
    owner: 'Owner 4',
    lastUpdated: new Date('2021-01-04').toLocaleString('en-GB'),
  },
  {
    key: 5,
    playlistName: 'Playlist 5',
    owner: 'Owner 5',
    lastUpdated: new Date('2021-01-05').toLocaleString('en-GB'),
  },
  {
    key: 6,
    playlistName: 'Playlist 6',
    owner: 'Owner 6',
    lastUpdated: new Date('2021-01-06').toLocaleString('en-GB'),
  },
  {
    key: 7,
    playlistName: 'Playlist 7',
    owner: 'Owner 7',
    lastUpdated: new Date('2021-01-07').toLocaleString('en-GB'),
  },
  {
    key: 8,
    playlistName: 'Playlist 8',
    owner: 'Owner 8',
    lastUpdated: new Date('2021-01-08').toLocaleString('en-GB'),
  },
  {
    key: 9,
    playlistName: 'Playlist 9',
    owner: 'Owner 9',
    lastUpdated: new Date('2021-01-09').toLocaleString('en-GB'),
  },
  {
    key: 10,
    playlistName: 'Playlist 10',
    owner: 'Owner 10',
    lastUpdated: new Date('2021-01-10').toLocaleString('en-GB'),
  },
  {
    key: 11,
    playlistName: 'Playlist 11',
    owner: 'Owner 11',
    lastUpdated: new Date('2021-01-11').toLocaleString('en-GB'),
  },
  {
    key: 12,
    playlistName: 'Playlist 12',
    owner: 'Owner 12',
    lastUpdated: new Date('2021-01-12').toLocaleString('en-GB'),
  },
  {
    key: 13,
    playlistName: 'Playlist 13',
    owner: 'Owner 13',
    lastUpdated: new Date('2021-01-13').toLocaleString('en-GB'),
  },
  {
    key: 14,
    playlistName: 'Playlist 14',
    owner: 'Owner 14',
    lastUpdated: new Date('2021-01-14').toLocaleString('en-GB'),
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.playlistName === 'Disabled User', // Column configuration not to be checked
    name: record.playlistName,
  }),
};

const Playlists = () => {
  const [openAddPlaylistModal, setOpenAddPlaylistModal] = React.useState(false);

  const openModal = () => {
    setOpenAddPlaylistModal(true);
  };

  const deletePlaylist = () => {
    console.log('delete');
  };

  const onAddPlaylist = () => {
    console.log('add');
  };

  const onCancelAddPlaylist = () => {
    setOpenAddPlaylistModal(false);
  };

  return (
    <Layout>
      <PlaylistsTable
        data={data}
        rowSelection={rowSelection}
        headerComponent={
          <Header onPlusClick={openModal} onDeleteClick={deletePlaylist} />
        }
      />
      <AddPlaylistForm
        open={openAddPlaylistModal}
        handleOk={onAddPlaylist}
        handleCancel={onCancelAddPlaylist}
      />
    </Layout>
  );
};

export default Playlists;
