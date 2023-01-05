import { UploadingFile } from '@manga-love-api/uploader/types';

export interface ICreateWorkRequest {
    titleEn: string;
    titleUa: string;
    categories: string[];
    illustration: UploadingFile;
}
