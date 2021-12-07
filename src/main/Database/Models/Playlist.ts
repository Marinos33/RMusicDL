import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DownloadingProfile } from './DownloadingProfile';

@Entity('playlist')
export class Playlist {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false
  })
  url: string;

  @Column({
    nullable: false
  })
  owner: string;

  @Column({
    nullable: false
  })
  playlistName: string;

  @Column({
    nullable: false
  })
  lastUpdate: Date; //store the last time the user has checked for update for this playlist

  @Column({ name: 'profile_id', nullable: false })
  profileId: number;

  @OneToOne(() => DownloadingProfile, { nullable: false, eager: true })
  @JoinColumn({ name: 'profile_id' })
  downloadingProfile: DownloadingProfile;
}
