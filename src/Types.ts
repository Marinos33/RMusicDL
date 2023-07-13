export type PlaylistInfo = {
  title: string;
  author: string;
  uploader_url: string;
  thumbnail: string;
};

export type Playlist = {
  id: number;
  url: string;
  owner: string;
  playlist_name: string;
  last_update: string;
  profile_id: number;
};
