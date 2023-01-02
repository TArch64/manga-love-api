import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from '@manga-love-api/database';
import { IAuthResponse, ISignUpRequest } from '../types';
import { TokenService } from './token.service';

@Injectable()
export class SignUpService {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private tokenService: TokenService;

    public async signUp(payload: ISignUpRequest): Promise<IAuthResponse> {
        const user = await this.prisma.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                password: await hash(payload.password),
            },
        });
        return { token: await this.tokenService.encode({ userId: user.id }) };
    }
}
