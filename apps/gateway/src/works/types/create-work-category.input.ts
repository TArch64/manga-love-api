import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWorkCategoryInput {
    @Field()
    public textEn: string;

    @Field()
    public textUa: string;
}
