import process from 'process';
import { NestFactory } from '@nestjs/core';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { INestMicroservice, Logger, Type } from '@nestjs/common';
import { MicroserviceKey } from './microservices.module';

export interface MicroserviceStarterOptions {
    key: MicroserviceKey;
    AppModule: Type<unknown>;
}

export class MicroserviceStarter {
    public static async run(config: MicroserviceStarterOptions): Promise<void> {
        await new this(config).run();
    }

    private readonly logger = new Logger(MicroserviceStarter.name);
    private app: INestMicroservice;

    constructor(
        private readonly options: MicroserviceStarterOptions,
    ) {}

    private async run(): Promise<void> {
        this.app = await this.createApp();
        await this.app.listen();
        this.reportStarted();
    }

    private createApp(): Promise<INestMicroservice> {
        return NestFactory.createMicroservice<RedisOptions>(this.options.AppModule, {
            transport: Transport.REDIS,
            options: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                name: `${this.options.key}_MICROSERVICE`,
            },
        });
    }

    private reportStarted(): void {
        this.logger.log(`${this.options.key} Microservice started`);
    }
}
