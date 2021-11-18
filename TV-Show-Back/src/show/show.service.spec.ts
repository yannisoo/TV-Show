import { Test, TestingModule } from '@nestjs/testing';
import { ShowService } from './show.service';
import { ApiService } from '../api/api.service';
import { ShowModule } from './show.module';

class ApiServiceMock {
  getAllShows() {
    return [];
  }
}

describe('ShowService', () => {
  let showService: ShowService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ApiService,
      useClass: ApiServiceMock
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowService, ShowModule, ApiServiceProvider]
    }).compile();

    showService = module.get<ShowService>(ShowService);
  });

  it('ShowService - should be defined', () => {
    expect(showService).toBeDefined();
  });

  it('ShowService - getAllShows - should return an array of shows', async () => {
    const result = await showService.getAllShows(
      '8be21dd5-5d85-4957-b7fa-586d9bb06641'
    );
    expect(result).toBeDefined();
  });
});
