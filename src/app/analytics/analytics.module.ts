import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RecoverPasswordModule } from '../recover-password/recover-password.module';
import { SessionModule } from '../session/session.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsEntity } from './analytics.entity';
import { AnalyticsService } from './analytics.service';

@Module({
    imports: [TypeOrmModule.forFeature([AnalyticsEntity]), AuthModule, SessionModule, RecoverPasswordModule],
    controllers: [AnalyticsController],
    providers: [AnalyticsService]
})
export class AnalyticsModule { }
