import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, LessThan, MoreThan, Repository } from 'typeorm';
import { RecoverPasswordEntity } from './recover-password.entity';
import { randomBytes } from 'crypto';
import { SendRecoveryTokenDto } from './dto/send-recovery-token.dto';
import { AuthService } from '../auth/auth.service';
import { GetValidRecoveryTokenDto } from './dto/get-valid-recovery-token.dto';
import { UpdatePasswordRecoveryTokenDto } from './dto/update-password-recovery-token.dto';

@Injectable()
export class RecoverPasswordService {

    constructor(
        @InjectRepository(RecoverPasswordEntity)
        private readonly recoveryPasswordRepository: Repository<RecoverPasswordEntity>,
        private readonly authService: AuthService
    ) { }

    async registerRecoveryToken(sendRecoveryToken: SendRecoveryTokenDto) {

        let token = String(randomBytes(64).toString('hex'));
        let auth = await this.authService.getAuthByEmail(sendRecoveryToken.email, sendRecoveryToken.application);

        if (!auth) {
            throw new HttpException({
                error: `EMAIL_NOT_EXIST`,
                email: sendRecoveryToken.email
            }, HttpStatus.FORBIDDEN)
        }

        let recovePasswordRecord = await this.recoveryPasswordRepository.save({
            authId: auth.id,
            token: token,
            application: auth.application,
        });

        if (!recovePasswordRecord) {
            throw new HttpException({
                error: `NO_TOKEN_GERATED`
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return {
            recoveryToken: token,
            email: auth.email
        }

    }

    async getValidRecoveryToken(getValidRecoveryToken: GetValidRecoveryTokenDto) {

        let minutesToTokenExpire = 15;

        let recoverTokenRecord = await this.recoveryPasswordRepository.findOne({
            token: getValidRecoveryToken.token,
            deletedAt: null,
            createdAt: MoreThan(new Date(this.getDateWithoutTimezone().getTime() - minutesToTokenExpire * 60000))
        })

        if (!recoverTokenRecord) {
            throw new HttpException({
                error: `INVALID_TOKEN`
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        let auth = await this.authService.getAuthById(recoverTokenRecord.authId, recoverTokenRecord.application);

        return {
            id: auth.id,
            email: auth.email
        }

    }

    removeExpiredRecoveryTokens() {

        let minutesToTokenExpire = 15;

        this.recoveryPasswordRepository.update({
            createdAt: LessThan(new Date(new Date().getTime() + minutesToTokenExpire * 100000)),
            deletedAt: null,
        }, {
            deletedAt: new Date()
        });

    }

    async updatePasswordByRecoveryToken(updatePasswordRecoveryTokenDto: UpdatePasswordRecoveryTokenDto) {

        let minutesToTokenExpire = 15;

        let authRecord = await this.getValidRecoveryToken({
            email: updatePasswordRecoveryTokenDto.email,
            token: updatePasswordRecoveryTokenDto.token,
            application: updatePasswordRecoveryTokenDto.application
        })

        if (!authRecord) {
            throw new HttpException({
                error: `INVALID_TOKEN`
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        let update = await this.authService.updatePasswordByAuthId(authRecord.id, updatePasswordRecoveryTokenDto.application, updatePasswordRecoveryTokenDto.new_password);

        let recoverTokenRecord = await this.recoveryPasswordRepository.findOne({
            token: updatePasswordRecoveryTokenDto.token,
            deletedAt: null,
            createdAt: MoreThan(new Date(new Date().getTime() - minutesToTokenExpire * 60000))
        })

        recoverTokenRecord.deletedAt = new Date();

        await this.recoveryPasswordRepository.save(recoverTokenRecord);

        return update;

    }

    async analyticsCounTotalRecoveryTokens() {

        return await this.recoveryPasswordRepository.count({
            deletedAt: null
        })

    }

    async analyticsCounTotalRecoveryTokensByAuth() {

        return (await getConnection()
            .getRepository(RecoverPasswordEntity)
            .createQueryBuilder()
            .select('auth_id')
            .where("deleted_at IS NULL")
            .groupBy('auth_id')
            .getRawMany()).length;

    }

    getDateWithoutTimezone = () => {

        let offset = new Date().getTimezoneOffset() * 60000;
        let utc = new Date().getTime() + offset;
        return new Date(utc);

    }

}
