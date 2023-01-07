import { Field, ObjectType } from '@nestjs/graphql';
import { IllustrationStatus } from '@manga-love-api/database';
import { GraphQLInt } from 'graphql/type';
import { GraphQLUUID } from '../../common/types';

@ObjectType()
export class IllustrationObject {
    @Field((returns) => GraphQLUUID)
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
