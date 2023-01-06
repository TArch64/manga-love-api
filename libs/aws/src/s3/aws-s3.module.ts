import { Module } from '@nestjs/common';
import { EnvironmentModule, EnvironmentService } from '@manga-love-api/core/environment';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { AwsS3Client, S3_CONFIG } from './aws-s3.client';
import { AwsS3Service } from './aws-s3.service';

@Module({
    imports: [EnvironmentModule],
    providers: [
        AwsS3Service,
        AwsS3Client,
        {
            provide: S3_CONFIG,
            inject: [EnvironmentService],
            useFactory: (environment: EnvironmentService): S3ClientConfig => ({
                region: environment.aws.region,
                credentials: {
                    accessKeyId: environment.aws.s3.accessKey,
                    secretAccessKey: environment.aws.s3.secretKey,
                },
            }),
        },
    ],
    exports: [AwsS3Service],
})
export class AwsS3Module {}
