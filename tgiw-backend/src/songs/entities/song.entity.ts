import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { User } from 'src/auth/entities/user.entity';

/*
 TODO comments
 */

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  album: string;

  @Column({ unique: true })
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

  @ManyToOne(() => User, (user) => user.contributions, {
    eager: true,
    cascade: true,
  })
  contributor: User;

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
