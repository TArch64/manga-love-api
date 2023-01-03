import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService, User, UserActionType } from '@manga-love-api/database';
import { SuccessResponse } from '@manga-love-api/core/success-response';
import { EnvironmentService } from '@manga-love-api/core/environment';
import { MailConfig } from '@manga-love-api/mailer/types';
import { Microservices } from '../microservices.config';

@Injectable()
export class VerifyEmailService {
    @Inject()
    private prisma: PrismaService;

    @Inject(Microservices.MAILER)
    private mailerMicroservice: ClientProxy;

    @Inject()
    private environment: EnvironmentService;

    public async verify(user: User): Promise<void> {
        const action = await this.prisma.userAction.create({
            data: {
                userId: user.id,
                type: UserActionType.VERIFY_EMAIL,
            },
        });

        await firstValueFrom(this.mailerMicroservice.send<SuccessResponse, MailConfig>('send', {
            email: user.email,
            subject: 'Verify Email',
            template: {
                name: 'auth/verify-email',
                data: {
                    username: user.username,
                    verificationUrl: `${this.environment.frontendUrl}/auth/verify-email?code=${action.id}`,
                },
            },
            attachments: [
                {
                    cid: 'illustration',
                    filename: 'illustration.png',
                    path: 'static/email/pending.png',
                },
            ],
        }));
    }
}
