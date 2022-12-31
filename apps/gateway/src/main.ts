import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@manga-love-api/database';
import { GatewayModule } from './gateway.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(GatewayModule);
    const prisma = app.get(PrismaService);
    await prisma.enableShutdownHooks(app);
    await app.listen(3000, '0.0.0.0');
}

bootstrap();
