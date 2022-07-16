import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RemoveAuthDto } from './dto/remove-auth.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { SessionService } from '../session/session.service';

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
            password: authenticateDto.password,
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

        if (removeAuth.password != auth.password) {

            throw new HttpException({
                error: `INVALID_PASSWORD`,
                email: removeAuth.email
            }, HttpStatus.BAD_REQUEST);

        }

        auth.deletedAt = new Date();

        return await this.authRepository.save(auth);

    }

    async #checkIfAuthExist(email: string, application: string): Promise<{
        exist: boolean;
        id: number | null;
    }> {

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

}
