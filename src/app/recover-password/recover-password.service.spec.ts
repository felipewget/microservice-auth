import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecoverPasswordEntity } from './recover-password.entity';
import { RecoverPasswordService } from './recover-password.service';

describe('RecoverPasswordService', () => {
  let recoverPassword: RecoverPasswordService;
  let recoverPasswordRepository: Repository<RecoverPasswordEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecoverPasswordService,
        {
          provide: getRepositoryToken(RecoverPasswordEntity),
          useValue: {}
        }
      ],
    }).compile();

    recoverPassword = module.get<RecoverPasswordService>(RecoverPasswordService);
    recoverPasswordRepository = module.get<Repository<RecoverPasswordEntity>>(getRepositoryToken(RecoverPasswordEntity));
  });

  it('should be defined', () => {
    expect(recoverPassword).toBeDefined();
    expect(recoverPasswordRepository).toBeDefined();
  });
});
