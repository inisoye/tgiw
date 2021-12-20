import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    createUser: jest.fn().mockImplementation((dto) => {
      return { uid: 'foo', ...dto };
    }),

    deleteUser: jest.fn().mockImplementation((_id) => null),

    getUser: jest.fn().mockImplementation((id) => {
      return {
        firebaseUser: { uid: id, email: 'bar@example.com' },
        localUser: { id: id, userName: 'bar' },
      };
    }),

    updateUser: jest.fn().mockImplementation((id, dto) => {
      return { uid: id, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('createUser', () => {
    const mockUser = {
      email: 'foo@bar.com',
      password: 'bar',
      userName: 'foo',
    };

    it("should return created user's details", async () => {
      const result = await authController.createUser(mockUser);

      expect(result).toMatchObject({
        uid: expect.any(String),
        email: 'foo@bar.com',
      });
    });

    it('should call mockAuthService.createUser', () => {
      expect(mockAuthService.createUser).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('delUser', () => {
    it('should call mockAuthService.deleteUser', async () => {
      await authController.deleteUser('1');
      expect(mockAuthService.deleteUser).toHaveBeenCalledWith('1');
    });
  });

  describe('getUser', () => {
    it("should return requested user's details", async () => {
      const result = await authController.getUser('1');

      expect(result).toMatchObject({
        firebaseUser: { uid: '1', email: expect.any(String) },
        localUser: { id: '1', userName: expect.any(String) },
      });
    });

    it('should call mockAuthService.getUser', () => {
      expect(mockAuthService.getUser).toHaveBeenCalledWith('1');
    });
  });

  describe('updateUser', () => {
    const mockUser = {
      email: 'foo@bar.com',
      password: 'bar',
    };

    it("should return updated user's details", async () => {
      const result = await authController.updateUser('1', mockUser);

      expect(result).toMatchObject({
        uid: expect.any(String),
        email: 'foo@bar.com',
      });
    });

    it('should call mockAuthService.updateUser', () => {
      expect(mockAuthService.updateUser).toHaveBeenCalledWith('1', mockUser);
    });
  });
});
