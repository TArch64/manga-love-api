import { IEnvironmentVars } from './environment-vars';

export interface IRedisScope {
    host: IEnvironmentVars['REDIS_HOST'];
    port: IEnvironmentVars['REDIS_PORT'];
}
