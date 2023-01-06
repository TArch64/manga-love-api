import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@manga-love-api/database';
import { UploaderStorageService } from '@manga-love-api/core/uploader-storage';
import { Queues } from '../uploader.queues';
import { IUploadIllustrationRequest } from '../types';

@Processor(Queues.UPLOADER)
export class UploadQueue {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private storageService: UploaderStorageService;

    @Process('illustration')
    public async uploadIllustration(job: Job<IUploadIllustrationRequest>): Promise<void> {
        await this.storageService.removeObject(job.data.objectId);
    }
}
