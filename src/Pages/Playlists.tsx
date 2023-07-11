import React, { useCallback } from 'react';
import Header from '../components/Playlists/Header';
import { Layout } from 'antd';
import PlaylistsTable, {
  DataType,
} from '../components/Playlists/PlaylistsTable';
import AddPlaylistForm from '../components/Playlists/AddPlaylistForm';
import { useDispatch } from 'react-redux';
import {
  addPlaylistDownloading,
  editRow,
  removePlaylistDownloading,
} from '../redux/UI/slice';
import EditForm from '../components/Playlists/EditForm';
import useBridge from '../hooks/useBrige';

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
  const dispatch = useDispatch();
  const { downloadPlaylist } = useBridge();

  const openModal = useCallback(() => {
    setOpenAddPlaylistModal(true);
  }, []);

  const onCancelAddPlaylist = useCallback(() => {
    setOpenAddPlaylistModal(false);
  }, []);

  const deletePlaylist = () => {
    console.log('delete');
  };

  const onAddPlaylist = () => {
    setOpenAddPlaylistModal(false);
    console.log('add');
  };

  const onEdit = useCallback(
    (record: DataType): void => {
      //convert record.key to number
      const key = Number(record.key);
      dispatch(editRow(key));
    },
    [dispatch],
  );

  const onDownload = useCallback(
    async (record: DataType): Promise<void> => {
      dispatch(addPlaylistDownloading(record.key.toString()));
      const res = await downloadPlaylist(
        'https://www.youtube.com/playlist?list=PLFsfqcOmAwBlENETwocuxImAaEXj3ArCN',
        'mp3',
        'H:/Music',
        'TEST1',
      );
      dispatch(removePlaylistDownloading(record.key.toString()));
    },
    [dispatch, downloadPlaylist],
  );

  const closeEdit = useCallback(() => {
    dispatch(editRow(null));
  }, [dispatch]);

  return (
    <Layout>
      <PlaylistsTable
        data={data}
        rowSelection={rowSelection}
        headerComponent={
          <Header onPlusClick={openModal} onDeleteClick={deletePlaylist} />
        }
        onEdit={onEdit}
        onDownload={onDownload}
      />
      <EditForm onSave={() => console.log('hey')} onClose={closeEdit} />
      <AddPlaylistForm
        open={openAddPlaylistModal}
        handleOk={onAddPlaylist}
        handleCancel={onCancelAddPlaylist}
      />
    </Layout>
  );
};

export default Playlists;
