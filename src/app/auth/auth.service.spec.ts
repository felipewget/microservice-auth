import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let auth: AuthService;
  let authRepository: Repository<AuthEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(AuthEntity),
          useValue: {}
        }
      ],
    }).compile();

    auth = module.get<AuthService>(AuthService);
    authRepository = module.get<Repository<AuthEntity>>(getRepositoryToken(AuthEntity))
  });

  it('should be defined', () => {
    expect(auth).toBeDefined();
    expect(authRepository).toBeDefined();
  });
});