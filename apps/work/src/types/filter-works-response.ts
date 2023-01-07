import { Work } from '@manga-love-api/database';

export interface IFilterWorksResponse {
    cursor?: string;
    list: Work[];
}
