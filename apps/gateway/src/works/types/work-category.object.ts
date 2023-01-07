import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLUUID } from '../../common/types';

@ObjectType()
export class WorkCategoryObject {
    @Field((returns) => GraphQLUUID)
    public id: string;

    @Field()
    public textEn: string;

    @Field()
    public textUa: string;
}
