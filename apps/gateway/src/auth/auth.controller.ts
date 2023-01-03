import { Controller, Get, Inject, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Microservices } from '../microservices.config';

@Controller('auth')
export class AuthController {
    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    @Get('verify-email')
    @Render('auth-email-verified')
    public verifyEmail(
        @Res() response: Response,
        @Query('code') code: string,
    ): Observable<unknown> {
        return this.authMicroservice.send('verify-email', code);
    }
}
