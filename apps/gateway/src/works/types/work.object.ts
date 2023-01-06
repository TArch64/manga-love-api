import { Field, ObjectType } from '@nestjs/graphql';
import { IllustrationObject } from '../../illustrations';
import { WorkCategoryObject } from './work-category.object';

@ObjectType()
export class WorkObject {
    @Field()
    public id: string;

    @Field()
    public titleEn: string;

    @Field()
    public titleUa: string;

    @Field((returns) => [WorkCategoryObject])
    public categories?: WorkCategoryObject[];

    @Field((returns) => IllustrationObject)
    public thumbnail?: IllustrationObject;
}
