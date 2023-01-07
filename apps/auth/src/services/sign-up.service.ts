import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from '@manga-love-api/database';
import { IAuthResponse, ISignUpRequest } from '../types';
import { TokenService } from './token.service';
import { VerifyEmailService } from './verify-email.service';
import { IAuthenticationPayload } from './authentication.service';

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
                avatarId: await this.getDefaultAvatarId(),
            },
        });
        await this.verifyEmailService.send(user);

        const tokenPayload: IAuthenticationPayload = { userId: user.id };
        return { token: await this.tokenService.encode(tokenPayload) };
    }

    private async getDefaultAvatarId(): Promise<string> {
        const defaultAvatar = await this.prisma.userDefaultAvatar.findUnique({
            where: { index: Math.floor(Math.random() * 10) },
        });
        return defaultAvatar.id;
    }
}
