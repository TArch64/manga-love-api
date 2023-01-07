import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from '@manga-love-api/database';
import { IUploadIllustrationRequest } from '@manga-love-api/uploader/types';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UploaderCommand } from '@manga-love-api/uploader/uploader.command';
import { IAuthResponse, ISignUpRequest } from '../types';
import { Microservices } from '../auth.microservices';
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

    @Inject(Microservices.UPLOADER)
    private uploaderMicroservice: ClientProxy;

    public async signUp(payload: ISignUpRequest): Promise<IAuthResponse> {
        const user = await this.prisma.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                password: await hash(payload.password),
                avatarId: await this.createAvatarId(payload.avatar),
            },
        });
        await this.verifyEmailService.send(user);

        const tokenPayload: IAuthenticationPayload = { userId: user.id };
        return { token: await this.tokenService.encode(tokenPayload) };
    }

    private async createAvatarId(avatar: IUploadIllustrationRequest): Promise<string> {
        if (!avatar) return this.getDefaultAvatarId();

        return await firstValueFrom<string>(
            this.uploaderMicroservice.send(UploaderCommand.UPLOAD_ILLUSTRATION, avatar),
        );
    }

    private async getDefaultAvatarId(): Promise<string> {
        const defaultAvatar = await this.prisma.userDefaultAvatar.findUnique({
            where: { index: Math.floor(Math.random() * 10) },
        });
        return defaultAvatar.id;
    }
}
