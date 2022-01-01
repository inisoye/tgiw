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
import { GetUserData } from '../auth/decorators/get-user-data.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { PaginatedQueryDto } from '../common/dto';
import { PaginatedResponse } from '../common/interfaces';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  getSongs(
    @Query() getSongsQueryDto: PaginatedQueryDto,
  ): Promise<PaginatedResponse<Song[]>> {
    return this.songsService.getSongs(getSongsQueryDto);
  }

  @Get('/10')
  get10Songs(): Promise<Song[]> {
    return this.songsService.get10Songs();
  }

  @Get('/:id')
  @UseGuards(FirebaseAuthGuard)
  getSongById(@Param('id') id: string): Promise<Song> {
    return this.songsService.getSongById(id);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  addSong(
    @Body() addSongDto: AddSongDto,
    @GetUserData('uid') uid: string,
    @GetUserData('role') role: string,
  ): Promise<Song> {
    return this.songsService.addSong(addSongDto, uid, role);
  }
}
