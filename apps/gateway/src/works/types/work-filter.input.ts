import { Field, InputType } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql/type';
import { IFilterWorksRequest } from '@manga-love-api/work/types';
import { ConstraintFormat, ConstraintValidator } from '../../common/decorators';

@InputType()
export class WorkFilterInput implements IFilterWorksRequest {
    @Field({ nullable: true })
    @ConstraintValidator({ format: ConstraintFormat.UUID })
    public cursor?: string;

    @Field((returns) => GraphQLInt)
    public count: number;
}
