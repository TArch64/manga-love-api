import { Field, InputType } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql/type';
import { IFilterWorksRequest } from '@manga-love-api/work/types';
import { ConstraintValidator } from '../../common/decorators';

@InputType()
export class WorkFilterInput implements IFilterWorksRequest {
    @Field((returns) => GraphQLInt)
    @ConstraintValidator({ min: 0 })
    public offset: number;

    @Field((returns) => GraphQLInt)
    @ConstraintValidator({ min: 1 })
    public count: number;
}
