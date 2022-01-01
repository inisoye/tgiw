// ! https://stackoverflow.com/a/52867903

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Artist } from '@/artists/entities/artist.entity';
import { User } from '@/auth/entities/user.entity';
import { Genre } from '@/genres/entities/genre.entity';
import { Song } from './entities/song.entity';
import { SongsService } from './songs.service';

describe('SongsService', () => {
  let songsService: SongsService;

  const mockSongRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    findOne: jest.fn().mockImplementation(({ id }) => {
      return { id, name: 'bar' };
    }),
    save: jest
      .fn()
      .mockImplementation((params) =>
        Promise.resolve({ id: 'foo', ...params }),
      ),
  };
  const mockGenreRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    findOne: jest.fn().mockImplementation((_username) => null),
  };
  const mockArtistRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    findOne: jest.fn().mockImplementation((_username) => null),
  };
  const mockUserRepository = {
    findOne: jest.fn().mockImplementation((_username) => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: getRepositoryToken(Song),
          useValue: mockSongRepository,
        },
        {
          provide: getRepositoryToken(Genre),
          useValue: mockGenreRepository,
        },
        {
          provide: getRepositoryToken(Artist),
          useValue: mockArtistRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    songsService = module.get<SongsService>(SongsService);
  });

  it('should be defined', () => {
    expect(songsService).toBeDefined();
  });

  describe('getSongById', () => {
    it('should call mockSongsService.getSongById', async () => {
      await songsService.getSongById('1');
      expect(mockSongRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
