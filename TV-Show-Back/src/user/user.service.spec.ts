import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  const userRepositoryMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock
        }
      ]
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it(' should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('login()', () => {
    it('should return a user', async () => {
      userRepositoryMock.findOne.mockResolvedValue({
        email: 'test@test.com',
        password: 'password',
        sanitizeObject: jest.fn(),
        comparePassword: jest.fn()
      });
      userRepositoryMock.create.mockResolvedValue({
        sanitizeObject: jest.fn()
      });
      userRepositoryMock.save.mockResolvedValue(null);

      const spyA = jest.spyOn(
        await userRepositoryMock.findOne(),
        'sanitizeObject'
      );
      spyA.mockReturnValue({
        id: 'chips',
        email: 'email@email.com'
      });
      const spyB = jest.spyOn(
        await userRepositoryMock.findOne(),
        'comparePassword'
      );
      spyB.mockResolvedValue(true);
      const result = await userService.login({
        email: 'test@test.com',
        password: 'password'
      });
      expect(result).toBeDefined();
      expect(result.id).toEqual('chips');
      expect(spyA).toHaveBeenCalledTimes(1);
      expect(spyA).toHaveBeenCalledWith({ withToken: true });
    });
    it('should throw a Email already exists', async () => {
      userRepositoryMock.findOne.mockResolvedValue(null);
      try {
        await userService.register({
          email: 'test@test.com',
          password: 'password'
        });
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.status).toBe(400);
        expect(e.message).toBe('Email already exists');
      }
    });
  });

  describe('register()', () => {
    it('should return a new user', async () => {
      userRepositoryMock.findOne.mockResolvedValue(null);
      userRepositoryMock.create.mockResolvedValue({
        sanitizeObject: jest.fn()
      });
      userRepositoryMock.save.mockResolvedValue(null);

      const spy = jest.spyOn(
        await userRepositoryMock.create(),
        'sanitizeObject'
      );
      spy.mockReturnValue({
        id: 'chips',
        email: 'email@email.com'
      });
      const result = await userService.register({
        email: 'test@test.com',
        password: 'password'
      });
      expect(result).toBeDefined();
      expect(result.id).toEqual('chips');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ withToken: true });
    });
    it('should throw a Email already exists', async () => {
      userRepositoryMock.findOne.mockResolvedValue(null);
      try {
        await userService.register({
          email: 'test@test.com',
          password: 'password'
        });
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.status).toBe(400);
        expect(e.message).toBe('Email already exists');
      }
    });
  });

  describe('getProfile()', () => {
    it(' getProfile - should return a user', async () => {
      userRepositoryMock.findOne.mockResolvedValue({
        sanitizeObject: jest.fn()
      });
      const spy = jest.spyOn(
        await userRepositoryMock.findOne(),
        'sanitizeObject'
      );
      spy.mockReturnValue({
        id: 'chips',
        email: 'email@email.com'
      });

      const result = await userService.getProfile(
        'yannis.battiston@capgemini.com'
      );

      expect(result).toBeDefined();
      expect(result.id).toEqual('chips');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ withToken: true });
    });

    it('should throw a NotFoundError when no user is returned', async () => {
      userRepositoryMock.findOne.mockResolvedValue(undefined);

      try {
        await userService.getProfile('test@capgemini.com');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.status).toBe(404);
        expect(e.message).toBe('Email does not exists');
      }
    });

    it('should throw an error if findOne fails', async () => {
      userRepositoryMock.findOne.mockRejectedValue(new Error());

      try {
        await userService.getProfile('test@capgemini.com');
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
});
