export interface Playlist {
  id: number;
  url: string;
  owner: string;
  playlistName: string;
  lastUpdate: Date;
  profile: Profile;
  lastCheck: Date;
}

export interface Profile {
  id: number;
  outputExtension: string;
  outputPath: string;
}
