import { Repository } from 'typeorm';
import Database from '..';
import { Playlist } from '../Models/Playlist';

export class PlaylistRepository {
  private ormRepository: Repository<Playlist>;

  constructor() {
    this.ormRepository = new Database().getConnection().getRepository(Playlist);
  }

  public async getAll(): Promise<Playlist[]> {
    const playlists = await this.ormRepository.find();

    return playlists;
  }

  public async create(url: string, owner: string, playlistName: string, profileId: number): Promise<Playlist> {
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
    await this.ormRepository.delete(id);
  }
}
