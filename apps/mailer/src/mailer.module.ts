import { Module } from '@nestjs/common';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import { EnvironmentModule, EnvironmentService } from '@manga-love-api/core/environment';
import { MailerController } from './mailer.controller';
import { queueModules } from './mailer.queues';
import { MAIL_TRANSPORTER, SenderQueue, TemplateRenderService } from './services';

@Module({
    imports: [
        EnvironmentModule,
        ...queueModules,
    ],
    controllers: [
        MailerController,
    ],
    providers: [
        SenderQueue,
        TemplateRenderService,
        {
            provide: MAIL_TRANSPORTER,
            inject: [EnvironmentService],
            useFactory({ mailer }: EnvironmentService): Transporter<SentMessageInfo> {
                return createTransport({
                    service: 'gmail',
                    auth: { user: mailer.user, pass: mailer.password },
                });
            },
        },
    ],
})
export class MailerModule {}
