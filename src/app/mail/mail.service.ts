import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    async sendEmail(emailConfig: {
        type: 'WELCOME' | 'SEND_RECOVERY_TOKEN',
        email: string
    }) {

        console.log('@TODO implement in other microservice the sender massive mail function', emailConfig)

    }

}
