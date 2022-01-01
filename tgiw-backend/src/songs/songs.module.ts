import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song } from './entities/song.entity';
import { Genre } from '@/genres/entities/genre.entity';
import { Artist } from '@/artists/entities/artist.entity';
import { User } from '@/auth/entities/user.entity';
import { HelpersModule } from '@/helpers/helpers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song, Genre, Artist, User]),
    HelpersModule,
  ],
  providers: [SongsService],
  controllers: [SongsController],
})
export class SongsModule {}
