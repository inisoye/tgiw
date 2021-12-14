import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song } from './song.entity';
import { Genre } from 'src/genres/genre.entity';
import { Artist } from 'src/artists/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Genre, Artist])],
  providers: [SongsService],
  controllers: [SongsController],
})
export class SongsModule {}
