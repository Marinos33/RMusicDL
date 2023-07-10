import { invoke } from '@tauri-apps/api/tauri';

export const getPlaylistInfo = async (url: string): Promise<any> => {
  try {
    const playlistInfo = await invoke('get_playlist_info', { url });
    return playlistInfo;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
