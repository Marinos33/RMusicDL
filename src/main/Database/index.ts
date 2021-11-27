import { app } from 'electron';
import path from 'path';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { DownloadingProfile } from './Models/DownloadingProfile';
import { Playlist } from './Models/Playlist';

const defaultStorageFolder = app.getPath('downloads');

export default class Database {
  private connection: Connection;

  constructor() {
    this.init();
  }

  public async init(): Promise<void> {
    this.connection = await createConnection({
      type: 'sqlite',
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
}
