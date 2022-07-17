import { Body, Controller, Delete, Ip, Post, Req } from '@nestjs/common';
import { detect } from 'detect-browser';
import { MailService } from '../mail/mail.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly mailService: MailService) { }

    @Post()
    authenticate(@Ip() ip: string, @Body() body) {
        let user_agent = detect();
        return this.authService.authenticate(body, ip, user_agent)
    }

    @Post('register')
    async register(@Body() body) {
        let authRecord = await this.authService.registerAuth(body);
        if (authRecord.email) {
            this.mailService.sendEmail({
                type: 'WELCOME',
                email: authRecord.email
            });
        }
        return authRecord;
    }

    @Delete()
    removeAuth(@Body() body) {
        return this.authService.removeAuth(body);
    }

}
