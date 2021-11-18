import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ApiService } from '../api/api.service';
import { UserModule } from './user.module';
import { AppModule } from '../app.module';

class ApiServiceMock {
  getAllUsers() {
    return [];
  }
}

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ApiService,
      useClass: ApiServiceMock
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserService, UserModule, ApiServiceProvider]
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('UserService - should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('UserService - getProfile - should return a user', async () => {
    const result = await userService.getProfile(
      'yannis.battiston@capgemini.com'
    );
    expect(result).toBeDefined();
  });
});
