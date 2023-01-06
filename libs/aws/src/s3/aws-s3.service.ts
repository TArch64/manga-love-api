import { Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { EnvironmentService } from '@manga-love-api/core/environment';
import { AwsS3Client } from './aws-s3.client';

export interface IAwsS3PutOptions {
    mimetype: string;
}

@Injectable()
export class AwsS3Service {
    @Inject()
    private client: AwsS3Client;

    @Inject()
    private environment: EnvironmentService;

    public async put(path: string, source: Buffer, options: Partial<IAwsS3PutOptions> = {}): Promise<void> {
        const input: PutObjectCommandInput = {
            ACL: 'private',
            Bucket: this.environment.aws.s3.bucket,
            Key: path,
            Body: source,
        };

        if (options.mimetype) input.ContentType = options.mimetype;

        const command = new PutObjectCommand(input);
        await this.client.send(command);
    }
}

