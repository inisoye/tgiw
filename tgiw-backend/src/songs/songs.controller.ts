import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Song } from './song.entity';
import { SongsService } from './songs.service';
import { AddSongDto } from './dtos';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  getTasks(@Query('filter') filter: string): Promise<Song[]> {
    return this.songsService.getSongs(filter);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Song> {
    return this.songsService.getSongById(id);
  }

  @Post()
  addSong(@Body() addSongDto: AddSongDto): Promise<Song> {
    return this.songsService.addSong(addSongDto);
  }
}
