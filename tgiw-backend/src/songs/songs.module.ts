import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song } from './entities/song.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Genre, Artist, User])],
  providers: [SongsService],
  controllers: [SongsController],
})
export class SongsModule {}
