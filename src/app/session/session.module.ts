import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './session.controller';
import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';

@Module({
    imports: [TypeOrmModule.forFeature([SessionEntity])],
    controllers: [SessionController],
    providers: [SessionService]
})
export class SessionModule { }