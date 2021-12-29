import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { DownloadingProfile } from './Models/DownloadingProfile';
import { Playlist } from './Models/Playlist';

const getDBConnection = async (connectionName: string): Promise<Connection> => {
  return await createConnection({
    name: connectionName,
    type: 'better-sqlite3',
    database: 'rmusicdl.sqlite',
    entities: [Playlist, DownloadingProfile],
    synchronize: true,
    logging: false
  });
};

export default getDBConnection;
