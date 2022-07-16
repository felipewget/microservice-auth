import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecoverPasswordEntity } from './recover-password.entity';

@Injectable()
export class RecoverPasswordService {

    constructor(
        @InjectRepository(RecoverPasswordEntity)
        private readonly recoveryPasswordRepository: Repository<RecoverPasswordEntity>
    ) { }

    setRecoveryToken() { }

    getRecoveryToken() { }

    removeExpiredRecoveryTokens() { }

}
