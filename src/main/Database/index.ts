import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { DownloadingProfile } from './Models/DownloadingProfile';
import { Playlist } from './Models/Playlist';

const getDBConnection = async (): Promise<Connection> => {
  return await createConnection({
    type: 'better-sqlite3',
    database: 'reactdl.sqlite',
    entities: [Playlist, DownloadingProfile],
    synchronize: true,
    logging: false
  });
};

export default getDBConnection;
