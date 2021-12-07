import { app } from 'electron';
import path from 'path';
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

/*export default class Database {
  private connection: Connection;

  constructor() {
    this.init();
  }

  public async init(): Promise<void> {
    this.connection = await createConnection({
      type: 'better-sqlite3',
      database: path.join(defaultStorageFolder, 'reactdl.sqlite'),
      entities: [Playlist, DownloadingProfile],
      synchronize: true,
      logging: false
    });

    if (this.connection.isConnected) {
      this.connection.synchronize();
    }
  }

  public getConnection(): Connection {
    return this.connection;
  }
}*/
