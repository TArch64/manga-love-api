import { NestFactory } from '@nestjs/core';
import { NatsOptions, Transport } from '@nestjs/microservices';
import { INestMicroservice, Logger, Type } from '@nestjs/common';
import { MICROSERVICES } from './microservices';

export interface MicroserviceStarterOptions {
    key: keyof typeof MICROSERVICES;
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
        return NestFactory.createMicroservice<NatsOptions>(this.options.AppModule, {
            transport: Transport.NATS,
            options: {
                servers: [process.env.NATS_URL],
                queue: `${this.options.key}_QUEUE`,
            },
        });
    }

    private reportStarted(): void {
        this.logger.log(`${this.options.key} Microservice started`);
    }
}
