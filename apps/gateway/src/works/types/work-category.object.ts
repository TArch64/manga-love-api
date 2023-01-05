import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WorkCategoryObject {
    @Field()
    public id: string;

    @Field()
    public textEn: string;

    @Field()
    public textUa: string;
}
