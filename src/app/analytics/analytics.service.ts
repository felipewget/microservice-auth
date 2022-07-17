import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { RecoverPasswordService } from '../recover-password/recover-password.service';
import { SessionService } from '../session/session.service';
import { AnalyticsEntity } from './analytics.entity';

@Injectable()
export class AnalyticsService {

    constructor(
        @InjectRepository(AnalyticsEntity)
        private readonly analyticsRepository: Repository<AnalyticsEntity>,
        private readonly recoverPasswordService: RecoverPasswordService,
        private readonly sessionService: SessionService,
        private readonly authService: AuthService,
    ) { }

    private readonly logger = new Logger(AnalyticsService.name);

    getReport() {

    }

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async setDailyReport() {

        this.logger.debug('Called every day at 10AM');

        let totalAuths = await this.authService.countTotalAuths()
        let totalUpdatePassword = await this.authService.countTotalAuthsWithPasswordUpdated();
        let totalActiveSessions = await this.sessionService.analyticsCounTotalActiveSessions();
        let totalActiveSessionsByAuths = await this.sessionService.analyticsCounTotalActiveAuths();
        let totalRecoveryTokens = await this.recoverPasswordService.analyticsCounTotalRecoveryTokens();
        let totalRecoveryTokenByAuth = await this.recoverPasswordService.analyticsCounTotalRecoveryTokensByAuth();

        await this.analyticsRepository.save({
            totalAuths: totalAuths,
            totalActiveSessions: totalActiveSessions,
            totalActiveSessionsByAuth: totalActiveSessionsByAuths,
            totalUpdatePassword: totalUpdatePassword,
            totalRecoveryToken: totalRecoveryTokens,
            totalRecoveryTokenByAuth: totalRecoveryTokenByAuth,
        })

        this.recoverPasswordService.removeExpiredRecoveryTokens();

    }

}
