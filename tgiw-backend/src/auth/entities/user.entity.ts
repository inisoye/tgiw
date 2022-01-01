import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Song } from '@/songs/entities/song.entity';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ unique: true })
  userName: string;

  @CreateDateColumn()
  dateAdded: Date;

  @OneToMany(() => Song, (song) => song.contributor)
  contributions: Song[];
}
