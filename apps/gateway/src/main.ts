import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(GatewayModule);
    await app.listen(3000);
}

bootstrap();
