import { Environment } from './environment';

export interface IEnvironmentVars {
    NODE_ENV: Environment;
    FRONTEND_URL: string;

    JWT_SECRET: string;
    JWT_EXPIRATION: number;

    BULL_ADMIN_USER: string;
    BULL_ADMIN_PASSWORD: string;

    MAILER_USER: string;
    MAILER_PASSWORD: string;

    REDIS_HOST: string;
    REDIS_PORT: number;
}
