import { Inject, Injectable } from '@nestjs/common';
import { S3Client as AwsClient, S3ClientConfig } from '@aws-sdk/client-s3';

export const S3_CONFIG = Symbol('S3_CONFIG');

@Injectable()
export class AwsS3Client extends AwsClient {
    constructor(@Inject(S3_CONFIG) config: S3ClientConfig) {
        super(config);
    }
}
