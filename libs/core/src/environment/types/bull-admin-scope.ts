import { IEnvironmentVars } from './environment-vars';

export interface IBullAdminScope {
    user: IEnvironmentVars['BULL_ADMIN_USER'];
    password: IEnvironmentVars['BULL_ADMIN_PASSWORD'];
}
