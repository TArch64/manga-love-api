import { Inject } from '@nestjs/common';
import { Transporter, SentMessageInfo, SendMailOptions } from 'nodemailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EnvironmentService } from '@manga-love-api/core/environment';
import { MailConfig } from '../types';
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

    private async buildOptions({ template, email, subject }: MailConfig): Promise<SendMailOptions>  {
        const html = await this.templateRender.render(template.name, template.data);

        return {
            from: `MangaLove <${this.environment.mailer.user}>`,
            to: email,
            subject: subject,
            html,
        };
    }
}
