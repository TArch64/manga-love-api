import { INestApplication, Inject } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';
import { getQueueToken } from '@nestjs/bull';
import { RequestHandler } from 'express';
import expressBasicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { Queues } from './queues.config';

const ENDPOINT = '/bull-admin';

export class BullAdminService {
    @Inject()
    private configService: ConfigService;

    public apply(app: INestApplication): void {
        const serverAdapter = this.buildAdapter();
        const queues = this.buildQueues(app);

        this.buildBoard(serverAdapter, queues);

        app.use(ENDPOINT, this.buildAuth(), serverAdapter.getRouter());
    }

    private buildAdapter(): ExpressAdapter {
        const serverAdapter = new ExpressAdapter();
        serverAdapter.setBasePath(ENDPOINT);
        return serverAdapter;
    }

    private buildBoard(serverAdapter: ExpressAdapter, queues: BullAdapter[]): void {
        createBullBoard({ serverAdapter, queues });
    }

    private buildQueues(app: INestApplication): BullAdapter[] {
        return Object.values(Queues).map((key) => {
            const queue = app.get(getQueueToken(key));
            return new BullAdapter(queue);
        });
    }

    private buildAuth(): RequestHandler {
        const user = this.configService.getOrThrow('BULL_ADMIN_USER');
        const password = this.configService.getOrThrow('BULL_ADMIN_PASSWORD');

        return expressBasicAuth({
            users: { [user]: password },
            challenge: true,
        });
    }
}
