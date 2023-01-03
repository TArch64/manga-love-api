import { Controller, Get, Inject, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { IStatusResponse } from '@manga-love-api/core/status-response';
import { Microservices } from '../microservices.config';

interface IVerifyEmailRender {
    heading: string;
    description: string;
    status: 'success' | 'error';
}

@Controller('auth')
export class AuthController {
    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    @Get('verify-email')
    @Render('auth-verify-email')
    public verifyEmail(
        @Res() response: Response,
        @Query('code') code: string,
    ): Observable<IVerifyEmailRender> {
        return this.authMicroservice.send<IStatusResponse, string>('verify-email', code).pipe(
            map(({ success }) => ({
                heading: success ? 'SUCCESS!' : 'Ooops...',
                description: success
                    ? 'Your email confirmed'
                    : 'This link for confirming email is expired or invalid ',
                status: success ? 'success' : 'error',
            })),
        );
    }
}
