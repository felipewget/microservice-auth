import { HttpException, HttpStatus, Injectable, Ip } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { SessionEntity } from './session.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class SessionService {

    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>
    ) { }

    async createSession(params: {
        authId: number,
        application: string,
        type: string,
        ip: string,
        browser: any
    }): Promise<string> {

        let token = String(randomBytes(64).toString('hex'));
        let record = { ...params, ...{ token: token } };

        let session = await this.sessionRepository.save(record);

        if (!session) {

            throw new HttpException({
                error: `SESSION_NOT_CREATED`,
            }, HttpStatus.INTERNAL_SERVER_ERROR);

        }

        return session.token;

    }

    async removeSession(authToken: string) {

        let session = await this.sessionRepository.findOne({
            token: authToken,
            deletedAt: null
        });

        if (!session) {

            throw new HttpException({
                error: "INVALID_SESSION",
                token: authToken
            }, HttpStatus.UNAUTHORIZED)

        }

        session.deletedAt = new Date();

        return await this.sessionRepository.save(session);

    }

    async removeAuthSessionsByAuthId(authId: number) {

        return await this.sessionRepository.update({
            authId: authId,
            deletedAt: null,
        }, {
            deletedAt: new Date()
        });

    }

    async removeAuthSessions(authToken: string) {

        let session = await this.sessionRepository.findOne({
            token: authToken,
            deletedAt: null
        });

        if (!session) {

            throw new HttpException({
                error: "INVALID_SESSION",
                token: authToken
            }, HttpStatus.UNAUTHORIZED)

        }

        return await this.removeAuthSessionsByAuthId(session.authId);

    }

    async getActiveSession(authToken: string) {

        let session = await this.sessionRepository.findOne({
            token: authToken,
            deletedAt: null
        });

        return {
            authenticated: session?.authId ? true : false,
            authId: session?.authId ? session.authId : null,
            auth_token: authToken
        }

    }

    async listActiveSessions(authToken: string) {

        let session = await this.sessionRepository.findOne({
            token: authToken,
            deletedAt: null
        });

        if (!session) {

            throw new HttpException({
                error: `INVALID_AUTHENTICATION`,
            }, HttpStatus.BAD_REQUEST);

        }

        return await this.sessionRepository.find({
            authId: session.authId,
            deletedAt: null
        });

    }

    treatHeaderAuthorizarion(headerAuthorization: string) {

        if (!(headerAuthorization && headerAuthorization.length > 15)) {

            throw new HttpException({
                error: `INVALID_AUTHENTICATION`,
            }, HttpStatus.BAD_REQUEST);

        }

        let token = headerAuthorization.replace('Bearer', '').trim()

        return token;

    }

    async analyticsCounTotalActiveSessions() {

        return await this.sessionRepository.count({
            deletedAt: null
        })

    }

    async analyticsCounTotalActiveAuths() {

        return (await getConnection()
            .getRepository(SessionEntity)
            .createQueryBuilder()
            .select('auth_id')
            .where("deleted_at IS NULL")
            .groupBy('auth_id')
            .getRawMany()).length;

    }

}
