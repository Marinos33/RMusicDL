import { Repository } from 'typeorm';
import getDBConnection from '..';
import { DownloadingProfile } from '../Models/DownloadingProfile';

export class ProfileRepository {
  private ormRepository: Repository<DownloadingProfile>;

  constructor() {
    this.init();
  }

  private async init() {
    const connection = await getDBConnection('profileConnection');
    this.ormRepository = connection.getRepository(DownloadingProfile);
  }

  public async create(outputExtension: string, outputPath: string): Promise<DownloadingProfile> {
    if (this.ormRepository === undefined) await this.init();

    const profile = this.ormRepository.create({
      outputExtension,
      outputPath
    });

    await this.ormRepository.save(profile);
    return profile;
  }

  public async delete(id: number): Promise<void> {
    if (this.ormRepository === undefined) await this.init();
    await this.ormRepository.delete(id);
  }
}