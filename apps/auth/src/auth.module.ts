import { Module } from '@nestjs/common';
import { DatabaseModule } from '@manga-love-api/database';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentModule, EnvironmentService } from '@manga-love-api/core/environment';
import { AuthController } from './auth.controller';
import { SignUpValidator } from './validators';
import { SignUpService, TokenService, VerifyEmailService } from './services';
import { MicroservicesModule } from './microservices.config';

@Module({
    imports: [
        DatabaseModule,
        EnvironmentModule,
        MicroservicesModule,
        JwtModule.registerAsync({
            inject: [EnvironmentService],
            useFactory: ({ jwt }: EnvironmentService) => ({
                secret: jwt.secret,
                signOptions: { expiresIn: jwt.expiration },
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
        VerifyEmailService,
    ],
})
export class AuthModule {}
