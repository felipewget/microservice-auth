import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionService {

    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>
    ) { }

    createSession() { }

    removeSession() { }

    getActiveSession() { }

    listActiveSessions() { }

}
