import {
  DownloadPlaylist,
  GetAllPlaylists,
  GetInfoPlaylist,
  GetPlaylist,
  RefreshPlaylist,
  RemovePlaylist,
  UpdateProfile
} from '../../src/main/api';
import { Mock, It, Times } from 'moq.ts';
import { Playlist } from '../../src/main/Database/Models/Playlist';
import { ProfileRepository } from '../../src/main/Database/Repository/DownloadingProfileRepository';
import { PlaylistRepository } from '../../src/main/Database/Repository/PlaylistRepository';
import { DownloadingProfile } from '../../src/main/Database/Models/DownloadingProfile';

describe('GetAllPlaylists()', () => {
  const testPlaylist1: Playlist = {
    id: 1,
    playlistName: 'test1',
    owner: 'test',
    url: 'http://play',
    profileId: 1,
    lastUpdate: new Date(),
    downloadingProfile: null
  };
  const testPlaylist2: Playlist = {
    id: 2,
    playlistName: 'test2',
    owner: 'test',
    url: 'http://play',
    profileId: 1,
    lastUpdate: new Date(),
    downloadingProfile: null
  };

  const data = [testPlaylist1, testPlaylist2];

  const mockRepository = new Mock<PlaylistRepository>()
    .setup((instance) => instance.getAll())
    .returns(Promise.resolve(data))
    .object();

  it('gather all playlist in db', async () => {
    const playlists = await GetAllPlaylists(mockRepository);
    expect(playlists.length).toBeGreaterThan(0);
  });
});

describe('GetPlaylist()', () => {
  const testPlaylist1: Playlist = {
    id: 1,
    playlistName: 'test1',
    owner: 'test',
    url: 'http://play',
    profileId: 1,
    lastUpdate: new Date(),
    downloadingProfile: null
  };

  const data = testPlaylist1;

  const mockRepository = new Mock<PlaylistRepository>()
    .setup((instance) => instance.getById(It.IsAny<number>()))
    .returns(Promise.resolve(data))
    .object();

  it('gather all playlist in db', async () => {
    const playlist = await GetPlaylist(mockRepository, It.IsAny<number>());
    expect(playlist).toBeDefined();
    expect(playlist).not.toBeNull();
  });
});

describe('RefreshPlaylist()', () => {
  const mockRepository = new Mock<PlaylistRepository>()
    .setup((instance) => instance.refresh(It.IsAny<number>()))
    .returns(Promise.resolve());

  it('refresh the last checked props of a playlist in the db', async () => {
    await RefreshPlaylist(mockRepository.object(), It.IsAny<number>());
    mockRepository.verify((instance) => instance.refresh(It.IsAny<number>()), Times.Exactly(1));
  });
});

describe('RemovePlaylist()', () => {
  const mockRepository = new Mock<PlaylistRepository>()
    .setup((instance) => instance.delete(It.IsAny<number>()))
    .returns(Promise.resolve());

  it('remove a playlist from the db', async () => {
    await RemovePlaylist(mockRepository.object(), It.IsAny<number>());
    mockRepository.verify((instance) => instance.delete(It.IsAny<number>()), Times.Exactly(1));
  });
});

describe('UpdateProfile()', () => {
  const testPlaylist1: Playlist = {
    id: 1,
    playlistName: 'test1',
    owner: 'test',
    url: 'http://play',
    profileId: 1,
    lastUpdate: new Date(),
    downloadingProfile: null
  };

  const testProfile: DownloadingProfile = {
    id: 1,
    outputExtension: 'mp3',
    outputPath: './'
  };

  const data = testPlaylist1;

  const mockPlaylistRepository = new Mock<PlaylistRepository>()
    .setup((instance) => instance.getById(It.IsAny<number>()))
    .returns(Promise.resolve(data));

  const mockProfileRepository = new Mock<ProfileRepository>()
    .setup((instance) => instance.update(It.IsAny<number>(), It.IsAny<string>(), It.IsAny<string>()))
    .returns(Promise.resolve(testProfile));

  it('update the downloading profile of a playlsit in the db', async () => {
    await UpdateProfile(
      mockProfileRepository.object(),
      mockPlaylistRepository.object(),
      It.IsAny<number>(),
      It.IsAny<string>(),
      It.IsAny<string>()
    );
    mockProfileRepository.verify(
      (instance) => instance.update(It.IsAny<number>(), It.IsAny<string>(), It.IsAny<string>()),
      Times.Exactly(1)
    );
  });
});

describe('GetInfoPlaylist()', () => {
  jest.setTimeout(120000);
  it('get info of a playlist', async () => {
    const info = await GetInfoPlaylist('https://www.youtube.com/playlist?list=PLFsfqcOmAwBm7zSAmfgu__UnwKex9eJaM');
    expect(info).not.toBeNull();
  });
});

describe('DownloadPlaylist()', () => {
  const testPlaylist1: Playlist = {
    id: 1,
    playlistName: 'test1',
    owner: 'test',
    url: 'https://www.youtube.com/playlist?list=PLFsfqcOmAwBm7zSAmfgu__UnwKex9eJaM',
    profileId: 1,
    lastUpdate: new Date(),
    downloadingProfile: {
      id: 1,
      outputExtension: 'mp3',
      outputPath: './'
    }
  };

  const data = testPlaylist1;

  const mockRepository = new Mock<PlaylistRepository>()
    .setup((instance) => instance.getById(It.IsAny<number>()))
    .returns(Promise.resolve(data));
  jest.setTimeout(120000);

  it('download a playlist', async () => {
    await expect(DownloadPlaylist(mockRepository.object(), It.IsAny<number>())).resolves.not.toThrow();
  });
});
