import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

export const REDIS_CONFIG = Symbol('REDIS_CONFIG');

@Injectable()
export class RedisService extends Redis {
    constructor(@Inject(REDIS_CONFIG) config: RedisOptions) {
        super(config);
    }
}
