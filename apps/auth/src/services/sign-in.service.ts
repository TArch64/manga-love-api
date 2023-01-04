import { Inject, Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { PrismaService, User } from '@manga-love-api/database';
import { RpcException } from '@nestjs/microservices';
import { IAuthResponse, ISignInRequest } from '../types';
import { TokenService } from './token.service';
import { IAuthenticationPayload } from './authentication.service';

@Injectable()
export class SignInService {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private tokenService: TokenService;

    public async signIn(payload: ISignInRequest): Promise<IAuthResponse> {
        const user = await this.prisma.user.findUnique({
            where: { username: payload.username },
        });

        if (!(user && await this.isPasswordMatch(user, payload.password))) {
            throw new RpcException('invalid-credentials');
        }

        const tokenPayload: IAuthenticationPayload = { userId: user.id };
        return { token: await this.tokenService.encode(tokenPayload) };
    }

    private isPasswordMatch(user: User, password: string): Promise<boolean> {
        return verify(user.password, password);
    }
}
