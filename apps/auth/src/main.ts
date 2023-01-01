import { MicroserviceStarter } from '@manga-love-api/core/microservices';
import { AuthModule } from './auth.module';

MicroserviceStarter.run({
    key: 'AUTH',
    AppModule: AuthModule,
});
