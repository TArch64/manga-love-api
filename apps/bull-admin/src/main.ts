import { NestFactory } from '@nestjs/core';
import { BullAdminModule } from './bull-admin.module';
import { BullAdminService } from './bull-admin.service';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(BullAdminModule);
    const initializer = app.get(BullAdminService);
    initializer.apply(app);
    await app.listen(3000, '0.0.0.0');
}

bootstrap();
