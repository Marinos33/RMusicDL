export interface Playlist {
  id: number;
  url: string;
  owner: string;
  playlistName: string;
  lastUpdate: Date;
  profile: Profile;
}

export interface Profile {
  id: number;
  outputExtension: string;
  outputPath: string;
}
