import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@manga-love-api/database';
import { UploaderStorageService } from '@manga-love-api/core/uploader-storage';
import { AwsS3Service } from '@manga-love-api/aws/s3';
import { Queues } from '../uploader.queues';
import { IUploadIllustrationRequest } from '../types';

@Processor(Queues.UPLOADER)
export class UploadQueue {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private storageService: UploaderStorageService;

    @Inject()
    private s3Service: AwsS3Service;

    @Process('illustration')
    public async uploadIllustration(job: Job<IUploadIllustrationRequest>): Promise<void> {
        const { objectId, mimetype, filename } = job.data;
        const buffer = await this.storageService.getObject(objectId);
        const path = `illustrations/${job.id}/${filename}`;
        await this.s3Service.put(path, buffer, { mimetype });
        await this.storageService.removeObject(job.data.objectId);
    }
}
