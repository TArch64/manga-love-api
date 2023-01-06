import { Readable } from 'stream';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import { PrismaService, IllustrationStatus } from '@manga-love-api/database';
import { UploaderStorageService } from '@manga-love-api/core/uploader-storage';
import { AwsS3Service } from '@manga-love-api/aws/s3';
import probeImageMeta from 'probe-image-size';
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
        const buffer = await this.storageService.getObject(job.data.objectId);
        await this.uploadToStorage(job.id as string, buffer, job.data.filename, job.data.mimetype);
        await this.updatePlaceholderRecord(job.id as string, buffer);
        await this.storageService.removeObject(job.data.objectId);
    }

    private async uploadToStorage(id: string, buffer: Buffer, filename: string, mimetype: string): Promise<void> {
        const path = `illustrations/${id}/${(filename)}`;
        await this.s3Service.put(path, buffer, { mimetype });
    }

    private async updatePlaceholderRecord(illustrationId: string, buffer: Buffer): Promise<void> {
        const meta = await probeImageMeta(Readable.from(buffer));

        await this.prisma.illustration.update({
            where: { id: illustrationId },
            data: {
                status: IllustrationStatus.UPLOADED,
                originalHeight: meta.height,
                originalWidth: meta.width,
            },
        });
    }
}
