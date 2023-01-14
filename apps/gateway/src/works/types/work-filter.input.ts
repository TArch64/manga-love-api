import { MaxLength, Min, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql/type';
import { IFilterWorksRequest, IFilterWorksSort } from '@manga-love-api/work/types';
import { GraphQLUUID } from '../../common/types';
import { WorkFilterSortInput } from './work-filter-sort.input';

@InputType()
export class WorkFilterInput implements IFilterWorksRequest {
    @Field((returns) => GraphQLInt)
    @Min(0)
    public offset: number;

    @Field((returns) => GraphQLInt)
    @Min(1)
    public count: number;

    @Field((returns) => WorkFilterSortInput, {
        defaultValue: WorkFilterSortInput.default,
    })
    public sort: IFilterWorksSort;

    @Field({ nullable: true })
    @MinLength(3)
    @MaxLength(255)
    public text?: string;

    @Field((returns) => [GraphQLUUID], { nullable: true })
    public categories: string[];
}
