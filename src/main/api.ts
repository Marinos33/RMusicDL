import { dialog } from 'electron';
import youtubedl, { YtResponse } from 'yt-dlp-exec';
import { Playlist } from './Database/Models/Playlist';
import { ProfileRepository } from './Database/Repository/DownloadingProfileRepository';
import { PlaylistRepository } from './Database/Repository/PlaylistRepository';
import Store from 'electron-store';
import log from 'electron-log';

export async function GetInfoPlaylist(playlistUrl: string): Promise<YtResponse> {
  try {
    const info = await youtubedl(playlistUrl, {
      dumpSingleJson: true
    });
    return info;
  } catch (e: any) {
    console.warn(e.message);
    log.warn('yt-dlp error', e.message);
    return null;
  }
}

export async function DownloadPlaylist(repository: PlaylistRepository, id: number): Promise<void> {
  try {
    const playlist = await GetPlaylist(repository, id);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ffmpeg = require('ffmpeg-static-electron');
    const isThumbnailEmbedded =
      playlist.downloadingProfile.outputExtension == 'mp3' ||
      playlist.downloadingProfile.outputExtension == 'mkv' ||
      playlist.downloadingProfile.outputExtension == 'mka' ||
      playlist.downloadingProfile.outputExtension == 'ogg' ||
      playlist.downloadingProfile.outputExtension == 'opus' ||
      playlist.downloadingProfile.outputExtension == 'flac' ||
      playlist.downloadingProfile.outputExtension == 'mp4' ||
      playlist.downloadingProfile.outputExtension == 'm4a' ||
      playlist.downloadingProfile.outputExtension == 'mov';

    await youtubedl(playlist.url, {
      verbose: false,
      yesPlaylist: true,
      output: playlist.downloadingProfile.outputPath + '/' + '%(playlist)s/%(title)s - %(uploader)s.%(ext)s',
      format: 'bestaudio[ext=mp3]/bestaudio',
      downloadArchive: playlist.playlistName + '/history.txt',
      ffmpegLocation: ffmpeg.path,
      extractAudio: true,
      audioFormat: playlist.downloadingProfile.outputExtension,
      embedThumbnail: isThumbnailEmbedded,
      addMetadata: true,
      postprocessorArgs: '-metadata album=' + playlist.playlistName
    });
  } catch (e: any) {
    console.warn(e.message);
    log.warn('yt-dlp error', e.message);
  }
}

export async function GetPlaylist(repository: PlaylistRepository, id: number): Promise<Playlist> {
  try {
    const playlist = await repository.getById(id);
    return playlist;
  } catch (e: any) {
    console.warn(e.message);
    return null;
  }
}

export async function GetAllPlaylists(repository: PlaylistRepository): Promise<Playlist[]> {
  try {
    const playlists = await repository.getAll();
    return playlists;
  } catch (e: any) {
    console.warn(e.message);
    return null;
  }
}

export async function CreatePlaylist(
  url: string,
  owner: string,
  playlistName: string,
  outputExtension: string,
  outputPath: string
): Promise<Playlist> {
  try {
    const profileRepository = new ProfileRepository();
    const profile = await profileRepository.create(outputExtension, outputPath);

    const playlistRepository = new PlaylistRepository();
    const newPlaylist = await playlistRepository.create(url, owner, playlistName, profile.id);
    return newPlaylist;
  } catch (e: any) {
    console.warn(e.message);
    return null;
  }
}

export async function RemovePlaylist(repository: PlaylistRepository, id: number): Promise<void> {
  try {
    await repository.delete(id);
  } catch (e: any) {
    console.warn(e.message);
  }
}

export async function RefreshPlaylist(repository: PlaylistRepository, id: number): Promise<void> {
  try {
    await repository.refresh(id);
  } catch (e: any) {
    console.warn(e.message);
    return null;
  }
}

export async function SelectFolder(): Promise<string> {
  const path = await dialog.showOpenDialog({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    properties: ['openDirectory']
  });
  return path.filePaths[0];
}

export async function UpdateProfile(
  profileRepository: ProfileRepository,
  playlistRepository: PlaylistRepository,
  playlistId: number,
  outputExtension: string,
  outputPath: string
): Promise<void> {
  try {
    const playlist = await playlistRepository.getById(playlistId);

    await profileRepository.update(playlist.profileId, outputExtension, outputPath);
  } catch (e: any) {
    console.warn(e.message);
  }
}
export async function UpdateSettings(setting: string, value: any): Promise<any> {
  const store = new Store();

  store.set('settings.' + setting, value);
  return Promise.resolve<any>(setting);
}

export async function GetStoredSettings(setting: string): Promise<any> {
  const store = new Store();

  if (setting !== 'settings') {
    return Promise.resolve<any>(store.get('settings.' + setting) as any);
  }

  return Promise.resolve<any>(store.get(setting) as any);
}
