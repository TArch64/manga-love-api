import { IEnvironmentVars } from './environment-vars';

export interface IAwsScope {
    region: IEnvironmentVars['AWS_REGION'];
    s3: IAwsS3Scope;
}

export interface IAwsS3Scope {
    bucket: IEnvironmentVars['AWS_S3_BUCKET'];
    cloudfrontOrigin: IEnvironmentVars['AWS_CLOUDFRONT_ORIGIN'];
    secretKey: IEnvironmentVars['AWS_S3_SECRET_KEY'];
    accessKey: IEnvironmentVars['AWS_S3_ACCESS_KEY'];
}
