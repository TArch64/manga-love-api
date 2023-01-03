import { IEnvironmentVars } from './environment-vars';

export interface IMailerScope {
    user: IEnvironmentVars['MAILER_USER'];
    password: IEnvironmentVars['BULL_ADMIN_PASSWORD'];
}
