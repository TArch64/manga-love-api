import { Global, Module } from '@nestjs/common';
import { RedisOptions } from 'ioredis';
import { EnvironmentModule, EnvironmentService } from '../environment';
import { REDIS_CONFIG, RedisService } from './redis.service';

@Global()
@Module({
    providers: [
        EnvironmentModule,
        RedisService,
        {
            provide: REDIS_CONFIG,
            inject: [EnvironmentService],
            useFactory: (environment: EnvironmentService): RedisOptions => environment.redis,
        },
    ],
    exports: [RedisService],
})
export class RedisModule {}
