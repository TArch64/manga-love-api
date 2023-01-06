import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@manga-love-api/core/environment';
import { DatabaseModule } from '@manga-love-api/database';
import { UploaderStorageModule } from '@manga-love-api/core/uploader-storage';
import { AwsS3Module } from '@manga-love-api/aws/s3';
import { UploaderController } from './uploader.controller';
import { queueModules } from './uploader.queues';
import { UploadQueue } from './services';

@Module({
    imports: [
        EnvironmentModule,
        DatabaseModule,
        UploaderStorageModule,
        AwsS3Module,
        ...queueModules,
    ],
    controllers: [
        UploaderController,
    ],
    providers: [
        UploadQueue,
    ],
})
export class UploaderModule {}
