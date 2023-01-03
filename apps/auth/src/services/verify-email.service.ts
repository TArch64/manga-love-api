import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService, User, UserAction, UserActionType, UserEmailStatus } from '@manga-love-api/database';
import { EnvironmentService } from '@manga-love-api/core/environment';
import { MailConfig } from '@manga-love-api/mailer/types';
import { IStatusResponse } from '@manga-love-api/core/status-response';
import { Microservices } from '../microservices.config';

@Injectable()
export class VerifyEmailService {
    @Inject()
    private prisma: PrismaService;

    @Inject(Microservices.MAILER)
    private mailerMicroservice: ClientProxy;

    @Inject()
    private environment: EnvironmentService;

    public async send(user: User): Promise<void> {
        const action = await this.prisma.userAction.create({
            data: {
                userId: user.id,
                type: UserActionType.VERIFY_EMAIL,
            },
        });
        await this.sendEmail(user, action);
    }

    private async sendEmail(user: User, action: UserAction): Promise<void> {
        await firstValueFrom(this.mailerMicroservice.send<IStatusResponse, MailConfig>('send', {
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

    public async verify(code: string): Promise<boolean> {
        const action = await this.prisma.userAction.findUnique({
            where: { id: code },
        });

        if (!action) return false;

        await this.prisma.$transaction([
            this.prisma.userAction.delete({
                where: { id: action.id },
            }),
            this.prisma.user.update({
                where: { id: action.userId },
                data: { emailStatus: UserEmailStatus.VERIFIED },
            }),
        ]);

        return true;
    }
}
