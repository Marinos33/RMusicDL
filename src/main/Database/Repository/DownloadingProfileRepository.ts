import { Connection, Repository } from 'typeorm';
import getDBConnection from '..';
import { DownloadingProfile } from '../Models/DownloadingProfile';

export class ProfileRepository {
  private ormRepository: Repository<DownloadingProfile>;
  private connection: Connection;

  constructor() {
    this.init();
  }

  private async init() {
    this.connection = await getDBConnection('profileConnection');
    if (!this.connection.isConnected) this.connection.connect();
    this.ormRepository = this.connection.getRepository(DownloadingProfile);
  }

  public async create(outputExtension: string, outputPath: string): Promise<DownloadingProfile> {
    if (this.ormRepository === undefined) await this.init();

    const profile = this.ormRepository.create({
      outputExtension,
      outputPath
    });

    await this.ormRepository.save(profile);
    this.connection.close();
    return profile;
  }

  public async update(id: number, outputExtension: string, outputPath: string): Promise<DownloadingProfile> {
    if (this.ormRepository === undefined) await this.init();

    /* await this.ormRepository.update(id, { outputExtension, outputPath });
    const updatedProfile = this.ormRepository.findOne(id);*/
    const updatedProfile = await this.ormRepository.save({
      id,
      outputExtension,
      outputPath
    });

    this.connection.close();
    return updatedProfile;
  }

  public async delete(id: number): Promise<void> {
    if (this.ormRepository === undefined) await this.init();
    await this.ormRepository.delete(id);
    this.connection.close();
  }
}
