import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    @Get('verify-email')
    public verifyEmail(
        @Res() response: Response,
        @Query('code') code: string,
    ): void {
        return response.render('auth-email-verified');
    }
}
