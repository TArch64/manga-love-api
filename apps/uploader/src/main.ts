import { MicroserviceStarter } from '@manga-love-api/core/microservices';
import { UploaderModule } from './uploader.module';

MicroserviceStarter.run({
    key: 'UPLOADER',
    AppModule: UploaderModule,
});
