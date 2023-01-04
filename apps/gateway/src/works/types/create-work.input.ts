import { Field, InputType } from '@nestjs/graphql';
import { CreateIllustrationInput } from '../../illustrations';
import { CreateWorkCategoryInput } from './create-work-category.input';

@InputType()
export class CreateWorkInput {
    @Field()
    public titleEn: string;

    @Field()
    public titleUa: string;

    @Field((returns) => [CreateWorkCategoryInput])
    public categories: CreateWorkCategoryInput[];

    @Field((returns) => CreateIllustrationInput)
    public illustration: CreateIllustrationInput;
}
