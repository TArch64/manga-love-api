import { IEnvironmentVars } from './environment-vars';

export interface IJwtScope {
    secret: IEnvironmentVars['JWT_SECRET'];
    expiration: IEnvironmentVars['JWT_EXPIRATION'];
}
