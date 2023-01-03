import { DynamicModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EnvironmentService } from '../environment';

const QUEUES = {
    MAILER: true,
};

type QueueKey = keyof typeof QUEUES;
type QueueTokens<Key extends QueueKey> = Partial<Record<Key, string>>;

export interface QueuesProvider<Key extends QueueKey> {
    Queues: QueueTokens<Key>;
    queueModules: DynamicModule[];
}

export class QueuesFactoryModule {
    public static create<Key extends QueueKey>(...queues: Key[]): QueuesProvider<Key> {
        const tokens: QueueTokens<Key> = {};
        const modules = [];

        for (const queue of queues) {
            tokens[queue] = `${queue}_QUEUE`;
            modules.push({ name: tokens[queue] });
        }

        return {
            Queues: tokens,

            queueModules: [
                BullModule.forRootAsync({
                    inject: [EnvironmentService],
                    useFactory: ({ redis }: EnvironmentService) => ({ redis }),
                }),
                BullModule.registerQueue(...modules),
            ],
        };
    }

    public static createAdmin(): QueuesProvider<QueueKey> {
        const queues = Object.keys(QUEUES) as Array<QueueKey>;
        return QueuesFactoryModule.create(...queues);
    }
}
