import { Readable } from 'stream';
import { v4 as uuid } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../redis';

@Injectable()
export class UploaderStorageService {
    @Inject()
    private redisService: RedisService;

    public async storeObject(stream: Readable): Promise<string> {
        const buffer = await this.readStream(stream);
        const objectId = uuid();
        await this.redisService.set(this.buildObjectKey(objectId), buffer);
        return objectId;
    }

    public async removeObject(objectId: string): Promise<void> {
        await this.redisService.del(this.buildObjectKey(objectId));
    }

    private readStream(stream: Readable): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks = [];

            stream
                .on('data', (chunk) => chunks.push(chunk))
                .once('end', () => resolve(Buffer.concat(chunks)))
                .once('error', (error) => reject(error));
        });
    }

    private buildObjectKey(id: string): string {
        return `uploading-object-${id}`;
    }
}
