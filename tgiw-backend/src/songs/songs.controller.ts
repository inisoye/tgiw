import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Song } from './entities/song.entity';
import { SongsService } from './songs.service';
import { AddSongDto } from './dto';
import { GetUserData } from 'src/auth/get-user-data.decorator';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  getSongs(@Query('filter') filter: string): Promise<Song[]> {
    return this.songsService.getSongs(filter);
  }

  @Get('/:id')
  getSongById(@Param('id') id: string): Promise<Song> {
    return this.songsService.getSongById(id);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  addSong(
    @Body() addSongDto: AddSongDto,
    @GetUserData('uid') uid: string,
  ): Promise<Song> {
    console.log(uid, 'uid');
    return this.songsService.addSong(addSongDto, uid);
  }
}
