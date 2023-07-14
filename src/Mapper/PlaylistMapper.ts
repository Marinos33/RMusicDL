import { Playlist } from '../Types';

//map from playlist rust to playlist ts
export const mapPlaylist = (playlist: any): Playlist => {
  return {
    id: playlist.id,
    url: playlist.url,
    owner: playlist.owner,
    playlistName: playlist.playlist_name,
    lastUpdate: playlist.last_update,
    profileId: playlist.profile_id,
  };
};

export const mapEachPlaylist = (playlists: any[]): Playlist[] => {
  return playlists.map((playlist) => mapPlaylist(playlist));
};
