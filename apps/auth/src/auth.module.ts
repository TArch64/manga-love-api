import { Module } from '@nestjs/common';
import { DatabaseModule } from '@manga-love-api/database';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { SignUpValidator } from './validators';
import { SignUpService, TokenService } from './services';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow('JWT_SECRET'),
                signOptions: { expiresIn: config.getOrThrow('JWT_EXPIRATION') },
            }),
        }),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        SignUpService,
        SignUpValidator,
        TokenService,
    ],
})
export class AuthModule {}
