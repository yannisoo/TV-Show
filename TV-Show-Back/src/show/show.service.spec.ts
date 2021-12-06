import { Test, TestingModule } from '@nestjs/testing';
import { ShowService } from './show.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowEntity } from './show.entity';
import { UserEntity } from '../user/user.entity';

describe('ShowService', () => {
  let showService: ShowService;
  const showRepositoryMock = {
    find: jest.fn(),
    save: jest.fn()
  };
  const userRepositoryMock = {
    findOne: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowService,
        {
          provide: getRepositoryToken(ShowEntity),
          useValue: showRepositoryMock
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock
        }
      ]
    }).compile();
    showService = module.get<ShowService>(ShowService);
  });

  it('ShowService - should be defined', () => {
    expect(showService).toBeDefined();
  });

  it('ShowService - getAllShows - should return an array of shows', async () => {
    userRepositoryMock.findOne.mockResolvedValue({
      id: 'test',
      email: 'test@test.com',
      password: 'password'
    });
    showRepositoryMock.find.mockResolvedValue([
      {
        id: 'abc',
        showId: 'showId',
        author: {
          id: 'test',
          sanitizeObject: jest.fn()
        }
      },
      {
        id: 'abcd',
        showId: 'showId',
        author: {
          id: 'test',
          sanitizeObject: jest.fn()
        }
      }
    ]);
    const result = await showService.getAllShows('test');
    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('abc');
  });
  it('ShowService - getAllShows - ', async () => {
    userRepositoryMock.findOne.mockResolvedValue(null);
    showRepositoryMock.find.mockResolvedValue(null);
    const result = await showService.getAllShows('test');
    expect(result).toBe(null);
  });
});
