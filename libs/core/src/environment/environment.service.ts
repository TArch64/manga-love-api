import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment, IBullAdminScope, IEnvironmentVars, IJwtScope, IMailerScope, IRedisScope } from './types';

@Injectable()
export class EnvironmentService {
    @Inject()
    private configService: ConfigService<IEnvironmentVars>;

    public get env(): Environment {
        return this.configService.getOrThrow('NODE_ENV');
    }

    public get isProduction(): boolean {
        return this.env === Environment.PRODUCTION;
    }

    public get isDevelopment(): boolean {
        return this.env === Environment.DEVELOPMENT;
    }

    public get frontendUrl(): string {
        return this.configService.getOrThrow('FRONTEND_URL');
    }

    public get jwt(): IJwtScope {
        return {
            secret: this.configService.getOrThrow('JWT_SECRET'),
            expiration: this.configService.getOrThrow<number>('JWT_EXPIRATION', { infer: true }),
        };
    }

    public get bullAdmin(): IBullAdminScope {
        return {
            user: this.configService.getOrThrow('BULL_ADMIN_USER'),
            password: this.configService.getOrThrow('BULL_ADMIN_PASSWORD'),
        };
    }

    public get mailer(): IMailerScope {
        return {
            user: this.configService.getOrThrow('MAILER_USER'),
            password: this.configService.getOrThrow('MAILER_PASSWORD'),
        };
    }

    public get redis(): IRedisScope {
        return {
            host: this.configService.getOrThrow('REDIS_HOST'),
            port: this.configService.getOrThrow<number>('REDIS_PORT', { infer: true }),
        };
    }
}
