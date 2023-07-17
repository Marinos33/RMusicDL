import React, { useCallback, useEffect, useMemo } from 'react';
import Header from '../components/Playlists/Header';
import { Layout } from 'antd';
import PlaylistsTable, {
  DataType,
} from '../components/Playlists/PlaylistsTable';
import AddPlaylistForm from '../components/Playlists/AddPlaylistForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPlaylistDownloading,
  editRow,
  removePlaylistDownloading,
} from '../redux/UI/slice';
import EditForm from '../components/Playlists/EditForm';
import useBridge from '../hooks/useBrige';
import { RootState } from '../redux/store';
import {
  addToPlaylists,
  removeFromPlaylists,
  setPlaylists,
  updateElementInPlaylists,
} from '../redux/Playlists/slice';

const Playlists = () => {
  const [openAddPlaylistModal, setOpenAddPlaylistModal] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState<DataType[]>([]);
  const dispatch = useDispatch();
  const playlists = useSelector(
    (state: RootState) => state.playlists.playlists,
  );
  const rowInEdition = useSelector((state: RootState) => state.ui.rowInEdition);
  const {
    downloadPlaylist,
    addPlaylist,
    getPlaylists,
    refreshPlaylist,
    getPlaylist,
    getDownloadingProfile,
    updateProfile,
    deletePlaylist,
  } = useBridge();

  const openModal = useCallback(() => {
    setOpenAddPlaylistModal(true);
  }, []);

  const onCancelAddPlaylist = useCallback(() => {
    setOpenAddPlaylistModal(false);
  }, []);

  const deleteSelectedPlaylists = () => {
    //for each selected playlist, delete it
    selectedRows.forEach(async (selectedRow) => {
      const id = Number(selectedRow.key);
      await deletePlaylist(id);
      dispatch(removeFromPlaylists(id));
    });
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.playlistName === 'Disabled User', // Column configuration not to be checked
      name: record.playlistName,
    }),
  };

  const onAddPlaylist = useCallback(
    async (
      name: string,
      url: string,
      owner: string,
      extension: string,
      path: string,
    ) => {
      setOpenAddPlaylistModal(false);
      const playlist = await addPlaylist(name, url, owner, extension, path);
      dispatch(addToPlaylists(playlist));
    },
    [addPlaylist, dispatch],
  );

  const onEditClick = useCallback(
    (record: DataType): void => {
      //convert record.key to number
      const key = Number(record.key);
      dispatch(editRow(key));
    },
    [dispatch],
  );

  const onSaveEdit = useCallback(
    async (record: any) => {
      if (rowInEdition !== null) {
        const id = rowInEdition;
        const path = record.path;
        const format = record.format;

        await updateProfile(id, format, path);
        dispatch(editRow(null));
      }
    },
    [dispatch, rowInEdition, updateProfile],
  );

  const onDownload = useCallback(
    async (record: DataType): Promise<void> => {
      const id = Number(record.key);
      dispatch(addPlaylistDownloading(id.toString()));
      const playlist = await getPlaylist(id);
      const profile = await getDownloadingProfile(playlist.profileId);
      await downloadPlaylist(
        playlist.url,
        profile.outputExtension,
        profile.outputPath,
        playlist.playlistName,
      );
      const playlistUpdated = await refreshPlaylist(id);
      dispatch(updateElementInPlaylists({ id, playlist: playlistUpdated }));
      dispatch(removePlaylistDownloading(id.toString()));
    },
    [
      dispatch,
      downloadPlaylist,
      getDownloadingProfile,
      getPlaylist,
      refreshPlaylist,
    ],
  );

  const closeEdit = useCallback(() => {
    dispatch(editRow(null));
  }, [dispatch]);

  const formatData = useMemo((): DataType[] => {
    return playlists.map((playlist) => {
      return {
        key: playlist.id,
        playlistName: playlist.playlistName,
        owner: playlist.owner,
        //convert from utc to local time with format dd/mm/yyyy - hh:mm
        lastUpdated: new Date(playlist.lastUpdate).toLocaleString(),
      };
    });
  }, [playlists]);

  const fetchPlaylists = useCallback(async () => {
    const playlists = await getPlaylists();
    dispatch(setPlaylists(playlists));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <PlaylistsTable
        data={formatData}
        rowSelection={rowSelection}
        headerComponent={
          <Header
            onPlusClick={openModal}
            onDeleteClick={deleteSelectedPlaylists}
            onSyncClick={fetchPlaylists}
          />
        }
        onEditClick={onEditClick}
        onDownload={onDownload}
      />
      <EditForm onSave={onSaveEdit} onClose={closeEdit} />
      <AddPlaylistForm
        open={openAddPlaylistModal}
        handleSubmit={onAddPlaylist}
        handleCancel={onCancelAddPlaylist}
      />
    </Layout>
  );
};

export default Playlists;
