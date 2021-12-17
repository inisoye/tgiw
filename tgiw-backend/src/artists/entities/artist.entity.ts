import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from '../../songs/entities/song.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  spotifyId: string;

  @Column()
  spotifyUrl: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  images: SpotifyApi.ImageObject[];

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];

  @ManyToMany(() => Genre, (genre) => genre.artists, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];
}
