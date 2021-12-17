import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Genre } from '../genres/entities/genre.entity';
import { Song } from '../songs/entities/song.entity';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Song, Artist])],
  providers: [ArtistsService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
