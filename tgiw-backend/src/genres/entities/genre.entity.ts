import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from '../../songs/entities/song.entity';
import { Artist } from '../../artists/entities/artist.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Song, (song) => song.genres)
  songs: Song[];

  @ManyToMany(() => Artist, (artist) => artist.genres)
  artists: Artist[];
}
