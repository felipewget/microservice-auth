import { Module } from '@nestjs/common';
import { RecoverPasswordController } from './recover-password.controller';
import { RecoverPasswordService } from './recover-password.service';

@Module({
  controllers: [RecoverPasswordController],
  providers: [RecoverPasswordService]
})
export class RecoverPasswordModule {}
