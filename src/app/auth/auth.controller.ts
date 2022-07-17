import { Body, Controller, Delete, Ip, Post, Req } from '@nestjs/common';
import { detect } from 'detect-browser';
import { MailService } from '../mail/mail.service';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RemoveAuthDto } from './dto/remove-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly mailService: MailService) { }

    @Post()
    authenticate(@Ip() ip: string, @Body() loginParams: AuthenticateDto) {
        let user_agent = detect();
        return this.authService.authenticate(loginParams, ip, user_agent)
    }

    @Post('register')
    async register(@Body() record: RegisterAuthDto) {
        let authRecord = await this.authService.registerAuth(record);
        if (authRecord.email) {
            this.mailService.sendEmail({
                type: 'WELCOME',
                email: authRecord.email
            });
        }
        return authRecord;
    }

    @Delete()
    removeAuth(@Body() removeParams: RemoveAuthDto) {
        return this.authService.removeAuth(removeParams);
    }

}
