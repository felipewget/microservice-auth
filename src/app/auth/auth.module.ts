import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { SessionModule } from '../session/session.module';
import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';
import { AuthService } from './auth.service';

@Module({
    exports: [AuthService],
    imports: [TypeOrmModule.forFeature([AuthEntity]), SessionModule, MailModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
