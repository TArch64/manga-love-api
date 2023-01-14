import path from 'path';
import process from 'process';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { PrismaService } from '@manga-love-api/database';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GatewayModule } from './gateway.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(GatewayModule);

    const prisma = app.get(PrismaService);
    await prisma.enableShutdownHooks(app);

    app.useStaticAssets(path.resolve(process.cwd(), 'static'), { prefix: '/static' });
    app.setBaseViewsDir(path.resolve(process.cwd(), './dist/apps/gateway/views'));
    app.setViewEngine('ejs');

    app.useGlobalPipes(new ValidationPipe());
    app.use(graphqlUploadExpress());

    await app.listen(3000, '0.0.0.0');
}

bootstrap();
