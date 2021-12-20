import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

jest.mock('firebase-admin', () => ({
  ...jest.mock('firebase-admin'),
  // Mocked firebase admin properties: https://stackoverflow.com/a/67909144
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  auth: jest.fn().mockImplementation(() => {
    return {
      createUser: jest.fn().mockImplementation((dto) => {
        return {
          uid: 'foo',
          ...dto,
        };
      }),

      deleteUser: jest.fn().mockImplementation((_id) => null),
    };
  }),
}));

describe('AuthService', () => {
  let authService: AuthService;

  // https://stackoverflow.com/a/65637147
  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'firebase') {
        return {};
      }

      return null;
    }),
  };

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),

    delete: jest.fn().mockImplementation((_id) => null),

    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: 'foo', ...user })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('createUser', () => {
    const mockUser = {
      email: 'foo@bar.com',
      password: 'bar',
      userName: 'foo',
    };

    it('should create and return a new user record', async () => {
      const result = await authService.createUser(mockUser);

      expect(result).toMatchObject({
        uid: expect.any(String),
        email: 'foo@bar.com',
        userName: 'foo',
      });
    });

    it('should call mockUserRepository.create', () => {
      expect(mockUserRepository.create).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should call mockUserRepository.delete', async () => {
      await authService.deleteUser('1');
      expect(mockUserRepository.delete).toHaveBeenCalled();
    });
  });
});
