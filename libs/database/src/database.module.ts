import { Global, Module } from '@nestjs/common';
import { EnvironmentModule } from '@manga-love-api/core/environment';
import { PrismaService } from './prisma';

@Global()
@Module({
    imports: [EnvironmentModule],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DatabaseModule {}
