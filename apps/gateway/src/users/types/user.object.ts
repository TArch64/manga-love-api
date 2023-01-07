import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLUUID } from '../../common/types';

@ObjectType()
export class UserObject {
    @Field((returns) => GraphQLUUID)
    public id: string;

    @Field()
    public username: string;

    @Field()
    public email: string;
}
