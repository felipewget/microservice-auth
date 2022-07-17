import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { MailService } from '../mail/mail.service';
import { RecoverPasswordService } from './recover-password.service';

@Controller('recover-password')
export class RecoverPasswordController {

    constructor(
        private readonly recoverPassword: RecoverPasswordService,
        private readonly mailService: MailService) { }

    @Post()
    async sendRecoveryToken(@Body() body) {

        let recoveryData = await this.recoverPassword.registerRecoveryToken(body);
        if (recoveryData.email) {
            this.mailService.sendEmail({
                type: 'SEND_RECOVERY_TOKEN',
                email: recoveryData.email
            });
        }
        return recoveryData; // remove this response

    }

    @Get()
    async getRecoveryToken(@Body() body) {
        return await this.recoverPassword.getValidRecoveryToken(body)
    }

    @Patch('update-password')
    async updatePassword(@Body() body) {
        return await this.recoverPassword.updatePasswordByRecoveryToken(body)
    }

}
