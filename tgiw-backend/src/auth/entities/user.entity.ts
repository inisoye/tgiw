import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Song } from 'src/songs/entities/song.entity';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ unique: true })
  userName: string;

  @OneToMany(() => Song, (song) => song.contributor)
  contributions: Song[];
}
