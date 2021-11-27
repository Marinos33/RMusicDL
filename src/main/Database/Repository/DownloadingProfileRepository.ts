import { Repository } from 'typeorm';
import { DownloadingProfile } from '../Models/DownloadingProfile';
import Database from '..';

export class ProfileRepository {
  private ormRepository: Repository<DownloadingProfile>;

  constructor() {
    this.ormRepository = new Database().getConnection().getRepository(DownloadingProfile);
  }

  public async getAll(): Promise<DownloadingProfile[]> {
    const profiles = await this.ormRepository.find();

    return profiles;
  }

  public async create(outputExtension: string, outputPath: string): Promise<DownloadingProfile> {
    const profiles = this.ormRepository.create({
      outputExtension,
      outputPath
    });

    await this.ormRepository.save(profiles);

    return profiles;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
