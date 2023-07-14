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
  playlistName: string;
  lastUpdate: string;
  profileId: number;
};

export type DownloadingProfile = {
  id: number;
  outputExtension: string;
  outputPath: string;
};

export type DbResult = {
  success: boolean;
  data?: any;
};
