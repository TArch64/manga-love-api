import path from 'path';
import process from 'process';
import { Inject } from '@nestjs/common';
import { Transporter, SentMessageInfo, SendMailOptions } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EnvironmentService } from '@manga-love-api/core/environment';
import { MailAttachment, MailConfig } from '../types';
import { Queues } from '../queues.config';
import { TemplateRenderService } from './template-render.service';

export const MAIL_TRANSPORTER = Symbol('MAIL_TRANSPORTER');

@Processor(Queues.MAILER)
export class SenderQueue {
    @Inject(MAIL_TRANSPORTER)
    private transporter: Transporter<SentMessageInfo>;

    @Inject()
    private templateRender: TemplateRenderService;

    @Inject()
    private environment: EnvironmentService;

    @Process('send')
    public async send(job: Job<MailConfig>): Promise<void> {
        const options = await this.buildOptions(job.data);

        await this.transporter.sendMail(options).catch(async (error) => {
            await job.takeLock();
            await job.moveToFailed(error);
        });
    }

    private async buildOptions(config: MailConfig): Promise<SendMailOptions>  {
        return {
            from: `MangaLove <${this.environment.mailer.user}>`,
            to: config.email,
            subject: config.subject,
            html: await this.templateRender.render(config.template.name, config.template.data),
            attachments: this.buildAttachments(config.attachments || []),
        };
    }

    private buildAttachments(attachments: MailAttachment[]): Attachment[] {
        return attachments.map((attachment) => ({
            ...attachment,
            path: path.resolve(process.cwd(), attachment.path),
        }));
    }
}
