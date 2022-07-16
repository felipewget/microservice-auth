import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { RecoverPasswordService } from './recover-password.service';

@Controller('recover-password')
export class RecoverPasswordController {

    constructor(private readonly recoverPassword: RecoverPasswordService) { }

    @Post()
    async sendRecoveryToken(@Body() body) {

        let recoveryData = await this.recoverPassword.registerRecoveryToken(body);
        // @TODO Send Email
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
