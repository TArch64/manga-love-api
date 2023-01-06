import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PrismaService, IllustrationStatus } from '@manga-love-api/database';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Queues } from './uploader.queues';
import { IUploadIllustrationRequest } from './types';
import { UploaderCommand } from './uploader.command';

@Controller()
export class UploaderController {
    @Inject()
    private prisma: PrismaService;

    constructor(
        @InjectQueue(Queues.UPLOADER)
        private readonly queue: Queue,
    ) {}

    @MessagePattern(UploaderCommand.UPLOAD_ILLUSTRATION)
    public async uploadIllustration(payload: IUploadIllustrationRequest): Promise<string> {
        const illustration = await this.prisma.illustration.create({
            data: {
                src: '',
                originalWidth: 0,
                originalHeight: 0,
                status: IllustrationStatus.UPLOADING,
            },
        });

        await this.queue.add('illustration', payload, {
            jobId: illustration.id,
            attempts: 3,
        });

        return illustration.id;
    }
}
