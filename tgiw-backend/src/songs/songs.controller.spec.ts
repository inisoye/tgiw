import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

describe('SongsController', () => {
  let songsController: SongsController;

  const mockSongsService = {
    getSongs: jest.fn().mockImplementation((_filter = '') => [
      { id: 'foo', name: 'bar' },
      { id: 'bar', name: 'foo' },
    ]),

    getSongById: jest.fn().mockImplementation((id) => {
      return { id, name: 'bar' };
    }),

    addSong: jest.fn().mockImplementation((dto) => {
      return { id: '1', ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [SongsService],
    })
      .overrideProvider(SongsService)
      .useValue(mockSongsService)
      .compile();

    songsController = module.get<SongsController>(SongsController);
  });

  it('should be defined', () => {
    expect(songsController).toBeDefined();
  });

  describe('getSongs', () => {
    it('should return all songs', async () => {
      const result = await songsController.getSongs('foo filter');

      expect(result).toEqual(
        expect.arrayContaining([{ id: 'foo', name: 'bar' }]),
      );
    });

    it('should call mockSongsService.getSongs', () => {
      expect(mockSongsService.getSongs).toHaveBeenCalledWith('foo filter');
    });
  });

  describe('getSongById', () => {
    it('should return requested song', async () => {
      const result = await songsController.getSongById('1');

      expect(result).toEqual({ id: '1', name: 'bar' });
    });

    it('should call mockSongsService.getSongById', () => {
      expect(mockSongsService.getSongById).toHaveBeenCalledWith('1');
    });
  });

  describe('addSong', () => {
    const mockSong = {
      name: 'string',
      artists: [
        {
          name: 'foo',
          images: [{ url: 'ajaj' }],
          genres: ['kka'],
          spotifyUrl: 'http://',
          spotifyId: 'akja',
        },
      ],
      album: 'string',
      spotifyId: 'string',
      spotifyUrl: 'string',
      snippetUrl: 'string',
      popularity: 20,
      isrc: 'string',
      images: [{ url: 'ajaj' }],
      yearReleased: 'string',
      genreNames: ['string'],
    };
    const mockUid = 'blah';

    it('should return requested song', async () => {
      const result = await songsController.addSong(mockSong, mockUid);

      expect(result).toEqual({ id: '1', ...mockSong });
    });

    it('should call mockSongsService.addSong', () => {
      expect(mockSongsService.addSong).toHaveBeenCalledWith(mockSong, mockUid);
    });
  });
});
