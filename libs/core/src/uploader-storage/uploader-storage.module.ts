import { Module } from '@nestjs/common';
import { RedisModule } from '../redis';
import { UploaderStorageService } from './uploader-storage.service';

@Module({
    imports: [RedisModule],
    providers: [UploaderStorageService],
    exports: [UploaderStorageService],
})
export class UploaderStorageModule {}
