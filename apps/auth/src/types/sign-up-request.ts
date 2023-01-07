import { IUploadIllustrationRequest } from '@manga-love-api/uploader/types';

export interface ISignUpRequest {
    username: string;
    password: string;
    email: string;
    avatar?: IUploadIllustrationRequest;
}
