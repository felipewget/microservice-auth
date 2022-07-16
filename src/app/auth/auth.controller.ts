import { Body, Controller, Delete, Ip, Post, Req } from '@nestjs/common';
import { detect } from 'detect-browser';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    //constructor(private readonly cousesService: CoursesService) { }
    constructor(private readonly authService: AuthService) { }

    @Post()
    authenticate(@Ip() ip: string, @Body() body) {
        let user_agent = detect();
        return this.authService.authenticate(body, ip, user_agent)
    }

    @Post('register')
    register(@Body() body) {
        return this.authService.registerAuth(body);
    }

    @Delete()
    removeAuth(@Body() body) {
        return this.authService.removeAuth(body);
    }

}
