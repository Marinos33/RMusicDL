import { Repository } from 'typeorm';
import getDBConnection from '..';
import { Playlist } from '../Models/Playlist';

export class PlaylistRepository {
  private ormRepository: Repository<Playlist>;

  constructor() {
    this.init();
  }

  private async init() {
    const connection = await getDBConnection('playlistConnection');
    this.ormRepository = connection.getRepository(Playlist);
  }

  public async getAll(): Promise<Playlist[]> {
    if (this.ormRepository === undefined) await this.init();

    const playlists = await this.ormRepository.find();

    return playlists;
  }

  public async create(url: string, owner: string, playlistName: string, profileId: number): Promise<Playlist> {
    if (this.ormRepository === undefined) await this.init();
    const playlist = this.ormRepository.create({
      url,
      owner,
      playlistName,
      lastUpdate: Date(),
      profileId
    });

    await this.ormRepository.save(playlist);

    return playlist;
  }

  public async refresh(id: number): Promise<void> {
    if (this.ormRepository === undefined) await this.init();
    await this.ormRepository.query(
      `
        UPDATE
          playlist
        SET
          lastUpdate = CURRENT_TIMESTAMP
        WHERE
          id = ?;
        `,
      [id]
    );
  }

  public async delete(id: number): Promise<void> {
    if (this.ormRepository === undefined) await this.init();
    await this.ormRepository.delete(id);
  }
}
