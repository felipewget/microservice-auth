import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, IsNull, Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RemoveAuthDto } from './dto/remove-auth.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { SessionService } from '../session/session.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        private readonly sessionService: SessionService
    ) { }

    async authenticate(authenticateDto: AuthenticateDto, ip: string, userAgent: object): Promise<{
        auth_id: number,
        auth_token: string
    }> {

        let auth = await this.authRepository.findOne({
            email: authenticateDto.email,
            password: crypto.createHmac('sha256', authenticateDto.password).digest('hex'),
            application: authenticateDto.application,
            deletedAt: null,
        });

        if (!auth) {

            throw new HttpException({
                error: `INVALID_AUTHENTICATION`,
            }, HttpStatus.BAD_REQUEST);

        }

        let sessionToken = await this.sessionService.createSession({
            authId: auth.id,
            application: auth.application,
            type: 'user',
            ip: ip,
            browser: userAgent
        })

        return {
            auth_id: auth.id,
            auth_token: sessionToken,
        }

    }

    async registerAuth(registerAuthDto: RegisterAuthDto): Promise<AuthEntity> {

        let is_there_auth = await this.#checkIfAuthExist(registerAuthDto.email, registerAuthDto.application);

        if (is_there_auth.exist === true) {

            throw new HttpException({
                error: `EMAIL_REGISTRED_ALREADY`,
                email: registerAuthDto.email
            }, HttpStatus.BAD_REQUEST);

        }

        registerAuthDto.password = crypto.createHmac('sha256', registerAuthDto.password).digest('hex');

        return await this.authRepository.save(registerAuthDto)

    }

    async removeAuth(removeAuth: RemoveAuthDto): Promise<AuthEntity> {

        let is_there_auth = await this.#checkIfAuthExist(removeAuth.email, removeAuth.application);

        if (is_there_auth.exist === false) {

            throw new HttpException({
                error: `EMAIL_NOT_REGISTRED`,
                email: removeAuth.email
            }, HttpStatus.BAD_REQUEST);

        }

        let auth = await this.authRepository.findOne(is_there_auth.id);

        if (crypto.createHmac('sha256', removeAuth.password).digest('hex') != auth.password) {

            throw new HttpException({
                error: `INVALID_PASSWORD`,
                email: removeAuth.email
            }, HttpStatus.BAD_REQUEST);

        }

        auth.deletedAt = new Date();

        let deletedAuth = await this.authRepository.save(auth);

        this.sessionService.removeAuthSessionsByAuthId(auth.id);

        return deletedAuth;

    }

    async #checkIfAuthExist(email: string, application: string): Promise<{
        exist: boolean;
        id: number | null;
    }> {

        console.log(email, application)

        let auth = await this.authRepository.findOne({
            email: email,
            application: application,
            deletedAt: null
        })

        return {
            exist: !auth ? false : true,
            id: auth?.id ? auth.id : null
        }

    }

    async getAuthByEmail(email: string, application: string) {

        return await this.authRepository.findOne({
            email: email,
            application: application,
            deletedAt: null
        })

    }

    async getAuthById(id: number, application: string) {

        return await this.authRepository.findOne({
            id: id,
            application: application,
            deletedAt: null
        })

    }

    async updatePasswordByAuthId(id: number, application: string, password: string) {

        let auth = await this.authRepository.findOne({
            id: id,
            application: application,
            deletedAt: null
        })

        auth.password = crypto.createHmac('sha256', password).digest('hex');

        return await this.authRepository.save(auth);

    }

    async countTotalAuths() {

        return this.authRepository.count({
            deletedAt: null
        })

    }

    async countTotalAuthsWithPasswordUpdated() {

        return this.authRepository.count({
            updatedAt: Not(IsNull()),
            deletedAt: null
        })

    }

}
