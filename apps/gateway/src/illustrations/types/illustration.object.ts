import { Field, ObjectType } from '@nestjs/graphql';
import { IllustrationStatus } from '@manga-love-api/database';
import { GraphQLInt } from 'graphql/type';

@ObjectType()
export class IllustrationObject {
    @Field()
    public id: string;

    @Field(() => GraphQLInt)
    public originalWidth: number;

    @Field(() => GraphQLInt)
    public originalHeight: number;

    @Field()
    public status: IllustrationStatus;

    @Field()
    public url?: string;

    public filename: string;
}
