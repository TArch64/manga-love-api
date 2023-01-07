import { Field, ObjectType } from '@nestjs/graphql';
import { IFilterWorksResponse } from '@manga-love-api/work/types';
import { Work } from '@manga-love-api/database';
import { WorkObject } from './work.object';

@ObjectType()
export class WorkFilterObject implements IFilterWorksResponse {
    @Field({ nullable: true })
    public cursor?: string;

    @Field((returns) => [WorkObject])
    public list: Work[];
}
