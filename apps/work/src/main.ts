import { MicroserviceStarter } from '@manga-love-api/core/microservices';
import { WorkModule } from './work.module';

MicroserviceStarter.run({
    key: 'WORK',
    AppModule: WorkModule,
});
