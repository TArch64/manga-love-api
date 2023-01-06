import { Field, ObjectType } from '@nestjs/graphql';
import { IllustrationStatus } from '@manga-love-api/database';

@ObjectType()
export class IllustrationObject {
    @Field()
    public id: string;

    @Field()
    public originalWidth: number;

    @Field()
    public originalHeight: number;

    @Field()
    public status: IllustrationStatus;

    @Field()
    public url?: string;

    public filename: string;
}
