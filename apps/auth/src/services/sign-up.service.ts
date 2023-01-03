import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from '@manga-love-api/database';
import { IAuthResponse, ISignUpRequest } from '../types';
import { TokenService } from './token.service';
import { VerifyEmailService } from './verify-email.service';

@Injectable()
export class SignUpService {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private tokenService: TokenService;

    @Inject()
    private verifyEmailService: VerifyEmailService;

    public async signUp(payload: ISignUpRequest): Promise<IAuthResponse> {
        const user = await this.prisma.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                password: await hash(payload.password),
            },
        });
        await this.verifyEmailService.send(user);
        return { token: await this.tokenService.encode({ userId: user.id }) };
    }
}
