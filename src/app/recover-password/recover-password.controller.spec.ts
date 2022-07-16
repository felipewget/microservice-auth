import { Test, TestingModule } from '@nestjs/testing';
import { RecoverPasswordController } from './recover-password.controller';

describe('RecoverPasswordController', () => {
  let controller: RecoverPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecoverPasswordController],
    }).compile();

    controller = module.get<RecoverPasswordController>(RecoverPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
