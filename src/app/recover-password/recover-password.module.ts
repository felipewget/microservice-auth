import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RecoverPasswordController } from './recover-password.controller';
import { RecoverPasswordEntity } from './recover-password.entity';
import { RecoverPasswordService } from './recover-password.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecoverPasswordEntity]), AuthModule],
  controllers: [RecoverPasswordController],
  providers: [RecoverPasswordService]
})
export class RecoverPasswordModule { }
