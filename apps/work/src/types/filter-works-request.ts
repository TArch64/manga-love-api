import { FieldSortOrder } from '@manga-love-api/database';

export enum WorkSortField {
    UPDATED_AT = 'updatedAt',
}

export interface IFilterWorksSort {
    field: WorkSortField;
    direction: FieldSortOrder;
}

export interface IFilterWorksRequest {
    offset: number;
    count: number;
    sort: IFilterWorksSort;
    text?: string;
    categories?: string[];
}
