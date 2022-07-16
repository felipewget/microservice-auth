import { Session } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let session: SessionService;
  let sessionRepository: Repository<SessionEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: getRepositoryToken(SessionEntity),
          useValue: {}
        }
      ],
    }).compile();

    session = module.get<SessionService>(SessionService);
    sessionRepository = module.get<Repository<SessionEntity>>(getRepositoryToken(SessionEntity))
  });

  it('should be defined', () => {
    expect(session).toBeDefined();
    expect(sessionRepository).toBeDefined();
  });
});
