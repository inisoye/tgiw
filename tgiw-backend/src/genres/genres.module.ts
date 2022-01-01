import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genre } from './entities/genre.entity';
import { Song } from '@/songs/entities/song.entity';
import { Artist } from '@/artists/entities/artist.entity';
import { HelpersModule } from '@/helpers/helpers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Song, Artist]), HelpersModule],
  providers: [GenresService],
  controllers: [GenresController],
})
export class GenresModule {}
