import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from '../session/session.module';
import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity]), SessionModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
