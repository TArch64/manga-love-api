import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLUUID } from '../../common/types';
import { IllustrationObject } from '../../illustrations';

@ObjectType()
export class UserObject {
    @Field((returns) => GraphQLUUID)
    public id: string;

    @Field()
    public username: string;

    @Field()
    public email: string;

    @Field((returns) => IllustrationObject)
    public avatar?: IllustrationObject;

    public avatarId: string;
}
