import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { v4 as generateId } from 'uuid';
import { SuccessResponse } from '@manga-love-api/core/success-response';
import { MailConfig } from './types';
import { Queues } from './queues.config';


@Controller()
export class MailerController {
    constructor(
        @InjectQueue(Queues.MAILER)
        private readonly queue: Queue,
    ) {}

    @MessagePattern('send')
    public async send(config: MailConfig): Promise<SuccessResponse> {
        await this.queue.add('send', config, {
            attempts: 3,
            jobId: generateId(),
        });
        return { success: true };
    }
}
