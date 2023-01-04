import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserObject {
    @Field()
    public id: string;

    @Field()
    public username: string;

    @Field()
    public email: string;
}
