import { QueuesFactoryModule } from '@manga-love-api/core/queues';

export const { queueModules, Queues } = QueuesFactoryModule.create('UPLOADER');
