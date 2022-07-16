import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>
    ) { }

    // authenticate(login: string, password: string) { }

    // register() { }

    // removeAuth(login: string, password: string) { }

}
