import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { getConnection } from 'typeorm';

describe('Shows', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
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

  it(`/POST register`, () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(201);
  });
  it(`/POST login`, () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(201);
  });
});
