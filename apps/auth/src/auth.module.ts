import { Module } from '@nestjs/common';
import { DatabaseModule } from '@manga-love-api/database';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [AuthController],
})
export class AuthModule {}
