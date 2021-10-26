export interface Playlist {
  id: number;
  url: string;
  owner: string;
  playlistName: string;
  lastUpdate: Date;
  profile: Profile;
  lastChecked: Date;
}

export interface Profile {
  id: number;
  profileName: string;
  outputExtension: string;
  outputPath: string;
  creationDate: Date;
}
