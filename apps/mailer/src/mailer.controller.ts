import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { v4 as uuid } from 'uuid';
import { IStatusResponse } from '@manga-love-api/core/status-response';
import { MailConfig } from './types';
import { Queues } from './mailer.queues';
import { MailerCommand } from './mailer.command';


@Controller()
export class MailerController {
    constructor(
        @InjectQueue(Queues.MAILER)
        private readonly queue: Queue,
    ) {}

    @MessagePattern(MailerCommand.SEND)
    public async send(config: MailConfig): Promise<IStatusResponse> {
        await this.queue.add('send', config, {
            attempts: 3,
            jobId: uuid(),
        });
        return { success: true };
    }
}
