import { Controller, Delete, Get, Headers } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {

    constructor(private readonly sessionService: SessionService) { }

    @Get()
    async getCurrentToken(@Headers('Authorization') authorization) {
        let token = this.sessionService.treatHeaderAuthorizarion(authorization);
        return await this.sessionService.getActiveSession(token);
    }

    @Get('all')
    async listAuthIdActiveSessions(@Headers('Authorization') authorization) {
        let token = this.sessionService.treatHeaderAuthorizarion(authorization);
        return await this.sessionService.listActiveSessions(token);
    }

    @Delete()
    async logout(@Headers('Authorization') authorization) {
        let token = this.sessionService.treatHeaderAuthorizarion(authorization);
        return await this.sessionService.removeSession(token);
    }

    @Delete('all')
    async logoutAllSessions(@Headers('Authorization') authorization) {
        let token = this.sessionService.treatHeaderAuthorizarion(authorization);
        return await this.sessionService.removeAuthSessions(token);
    }

}
