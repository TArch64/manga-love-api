import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { INestMicroservice, Type } from '@nestjs/common';

export interface MicroserviceStarterConfig {
    title: string;
    AppModule: Type<unknown>;
}

export class MicroserviceStarter {
    public static async run(config: MicroserviceStarterConfig): Promise<void> {
        await new this(config.title, config.AppModule).run();
    }

    constructor(
        protected readonly title: MicroserviceStarterConfig['title'],
        protected readonly AppModule: MicroserviceStarterConfig['AppModule'],
    ) {}

    protected async run(): Promise<void> {
        const app = await this.createApp();
        await app.listen();
        this.reportStarted();
    }

    protected createApp(): Promise<INestMicroservice> {
        return NestFactory.createMicroservice<TcpOptions>(this.AppModule, {
            transport: Transport.TCP,
            options: { host: '0.0.0.0', port: 3000 },
        });
    }

    protected reportStarted(): void {
        console.log(`API ${this.title} Service started`);
    }
}
