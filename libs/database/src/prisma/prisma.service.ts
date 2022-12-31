import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: [{ level: 'query', emit: 'event' }],
        });
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect();
        this.useLogger();
    }

    public async enableShutdownHooks(app: INestApplication): Promise<void> {
        this.$on('beforeExit', async () => await app.close());
    }

    private useLogger(): void {
        // @ts-ignore
        this.$on<'query'>('query', (event) => {
            console.log('');
            console.log(`Time: ${event.timestamp}`);
            console.log(`Query: ${event.query}`);
            console.log(`Params: ${event.params}`);
            console.log(`Duration: ${event.duration}ms`);
        });
    }
}
