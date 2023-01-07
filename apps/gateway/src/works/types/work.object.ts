import { Field, ObjectType } from '@nestjs/graphql';
import { IllustrationObject } from '../../illustrations';
import { GraphQLUUID } from '../../common/types';
import { WorkCategoryObject } from './work-category.object';

@ObjectType()
export class WorkObject {
    @Field((returns) => GraphQLUUID)
    public id: string;

    @Field()
    public titleEn: string;

    @Field()
    public titleUa: string;

    @Field((returns) => [WorkCategoryObject])
    public categories?: WorkCategoryObject[];

    @Field((returns) => IllustrationObject)
    public thumbnail?: IllustrationObject;

    public thumbnailId: string;
}
