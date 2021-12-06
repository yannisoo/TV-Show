import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { getConnection, Repository } from 'typeorm';
import { ShowEntity } from '../src/show/show.entity';
import { UserEntity } from '../src/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSO } from '../src/user/user.dto';

describe('Shows', () => {
  let app: INestApplication;
  let showRepository: Repository<ShowEntity>;
  let userRepository: Repository<UserEntity>;
  let userSO: UserSO;
  let newShow: ShowEntity;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    showRepository = app.get(getRepositoryToken(ShowEntity));
    userRepository = app.get(getRepositoryToken(UserEntity));
    const user = await userRepository.create({
      email: 'test@test.com',
      password: 'password'
    });
    await userRepository.save(user);
    userSO = user.sanitizeObject({ withToken: true });

    newShow = showRepository.create({
      showId: '123',
      author: user,
      completed: false
    });
    await showRepository.save(newShow);
    await app.init();
  });
  afterAll(async () => {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.query(
        `TRUNCATE TABLE "public"."${entity.tableName}" CASCADE;`
      );
    }
  });

  it(`/GET shows with token`, () => {
    return request(app.getHttpServer())
      .get('/shows')
      .set('autorization', `Bearer ${userSO.token}`)
      .expect(200);
  });
  it(`/GET shows without token`, () => {
    return request(app.getHttpServer()).get('/shows').expect(401);
  });
  it(`/POST show with token`, () => {
    return request(app.getHttpServer())
      .post('/shows')
      .send({ showId: '123', seen: 'false' })
      .set('autorization', `Bearer ${userSO.token}`)
      .expect(201);
  });
  it(`/PATCH show with token`, () => {
    return request(app.getHttpServer())
      .patch('/shows/123')
      .send({ seen: 'true' })
      .set('autorization', `Bearer ${userSO.token}`)
      .expect(200);
  });
});
