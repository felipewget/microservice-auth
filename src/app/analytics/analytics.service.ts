import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
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

    getReport() {

    }

    @Cron('45 * * * * *')
    async setDailyReport() {

        let totalAuths = await this.authService.countTotalAuths()
        let totalUpdatePassword = await this.authService.countTotalAuthsWithPasswordUpdated();
        let totalActiveSessions = await this.sessionService.analyticsCounTotalActiveSessions();
        let totalActiveSessionsByAuths = await this.sessionService.analyticsCounTotalActiveAuths();
        console.log(totalActiveSessionsByAuths)
        let totalRecoveryTokens = await this.recoverPasswordService.analyticsCounTotalRecoveryTokens();
        let totalRecoveryTokenByAuth = await this.recoverPasswordService.analyticsCounTotalRecoveryTokensByAuth();

        return this.analyticsRepository.save({
            totalAuths: totalAuths,
            totalActiveSessions: totalActiveSessions,
            totalActiveSessionsByAuth: totalActiveSessionsByAuths,
            totalUpdatePassword: totalUpdatePassword,
            totalRecoveryToken: totalRecoveryTokens,
            totalRecoveryTokenByAuth: totalRecoveryTokenByAuth,
        })

    }

}
