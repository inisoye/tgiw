import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from 'src/genres/genre.entity';
import { Artist } from 'src/artists/artist.entity';

/*
 TODO Users and comments
 */

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  album: string;

  @Column()
  spotifyId: string;

  @Column()
  spotifyUrl: string;

  @Column()
  snippetUrl: string;

  @Column()
  popularity: number;

  @Column()
  isrc: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  images: SpotifyApi.ImageObject[];

  @CreateDateColumn()
  dateAdded: Date;

  @Column()
  yearReleased: string;

  @ManyToMany(() => Genre, (genre) => genre.songs, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Artist, (artist) => artist.songs, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  artists: Artist[];
}
