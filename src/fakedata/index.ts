import { Playlist, Profile } from '@src/renderer/types';

const profile1: Profile = {
  id: 1,
  outputExtension: 'mp3',
  outputPath: 'downloads'
};

const profile2: Profile = {
  id: 2,
  outputExtension: 'mp3',
  outputPath: 'downloads'
};

const profile3: Profile = {
  id: 3,
  outputExtension: 'mp3',
  outputPath: 'downloads'
};

const profile4: Profile = {
  id: 4,
  outputExtension: 'mp3',
  outputPath: 'downloads'
};

const profile5: Profile = {
  id: 5,
  outputExtension: 'mp3',
  outputPath: 'downloads'
};

export const playlists: Playlist[] = [
  {
    id: 1,
    playlistName: 'test1',
    owner: 'myself',
    url: 'an url',
    lastUpdate: new Date('2020-01-01'),
    profile: profile1
  },
  {
    id: 2,
    playlistName: 'test2',
    owner: 'yourself',
    url: 'not an url',
    lastUpdate: new Date('2019-01-01'),
    profile: profile2
  },
  {
    id: 3,
    playlistName: 'test3',
    owner: 'theyself',
    url: 'rick roll',
    lastUpdate: new Date('2018-01-01'),
    profile: profile3
  },
  {
    id: 4,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 5,
    playlistName: 'test5',
    owner: 'himself',
    url: 'giorno',
    lastUpdate: new Date('2016-01-01'),
    profile: profile5
  },
  {
    id: 6,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 7,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 8,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 9,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 1,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 11,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 12,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 13,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 14,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 15,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 24,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 34,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 44,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    profile: profile4
  }
];
