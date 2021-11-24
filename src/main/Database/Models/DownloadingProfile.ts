import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('downloading_profile')
export class DownloadingProfile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false
  })
  outputExtension: string;

  @Column({
    nullable: false
  })
  outputPath: string;
}
