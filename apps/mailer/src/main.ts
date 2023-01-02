import { MicroserviceStarter } from '@manga-love-api/core/microservices';
import { MailerModule } from './mailer.module';

MicroserviceStarter.run({
    key: 'MAILER',
    AppModule: MailerModule,
});
