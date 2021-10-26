import { Playlist, Profile } from '@src/renderer/types';

const profile1: Profile = {
  id: 1,
  profileName: 'default',
  outputExtension: 'mp3',
  outputPath: 'downloads',
  creationDate: new Date('2020-01-01')
};

const profile2: Profile = {
  id: 2,
  profileName: 'default',
  outputExtension: 'mp3',
  outputPath: 'downloads',
  creationDate: new Date('2020-01-01')
};

const profile3: Profile = {
  id: 3,
  profileName: 'default',
  outputExtension: 'mp3',
  outputPath: 'downloads',
  creationDate: new Date('2020-01-01')
};

const profile4: Profile = {
  id: 4,
  profileName: 'default',
  outputExtension: 'mp3',
  outputPath: 'downloads',
  creationDate: new Date('2020-01-01')
};

const profile5: Profile = {
  id: 5,
  profileName: 'default',
  outputExtension: 'mp3',
  outputPath: 'downloads',
  creationDate: new Date('2020-01-01')
};

export const Playlists: Playlist[] = [
  {
    id: 1,
    playlistName: 'test1',
    owner: 'myself',
    url: 'an url',
    lastUpdate: new Date('2020-01-01'),
    lastChecked: new Date('2020-01-01'),
    profile: profile1
  },
  {
    id: 2,
    playlistName: 'test2',
    owner: 'yourself',
    url: 'not an url',
    lastUpdate: new Date('2019-01-01'),
    lastChecked: new Date('2019-01-01'),
    profile: profile2
  },
  {
    id: 3,
    playlistName: 'test3',
    owner: 'theyself',
    url: 'rick roll',
    lastUpdate: new Date('2018-01-01'),
    lastChecked: new Date('2018-01-01'),
    profile: profile3
  },
  {
    id: 4,
    playlistName: 'test4',
    owner: 'ourselves',
    url: 'yes',
    lastUpdate: new Date('2017-01-01'),
    lastChecked: new Date('2017-01-01'),
    profile: profile4
  },
  {
    id: 5,
    playlistName: 'test5',
    owner: 'himself',
    url: 'giorno',
    lastUpdate: new Date('2016-01-01'),
    lastChecked: new Date('2016-01-01'),
    profile: profile5
  }
];
