import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Song } from 'src/songs/song.entity';
import { Artist } from 'src/artists/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Song, Artist])],
  providers: [GenresService],
  controllers: [GenresController],
})
export class GenresModule {}
