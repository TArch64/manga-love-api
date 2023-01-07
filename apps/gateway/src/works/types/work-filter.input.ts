import { Field, InputType } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql/type';
import { IFilterWorksRequest, IFilterWorksSort } from '@manga-love-api/work/types';
import { ConstraintValidator } from '../../common/decorators';
import { WorkFilterSortInput } from './work-filter-sort.input';

@InputType()
export class WorkFilterInput implements IFilterWorksRequest {
    @Field((returns) => GraphQLInt)
    @ConstraintValidator({ min: 0 })
    public offset: number;

    @Field((returns) => GraphQLInt)
    @ConstraintValidator({ min: 1 })
    public count: number;

    @Field((returns) => WorkFilterSortInput, {
        defaultValue: WorkFilterSortInput.default,
    })
    public sort: IFilterWorksSort;

    @Field({ nullable: true })
    @ConstraintValidator({ minLength: 3, maxLength: 255 })
    public text?: string;
}
