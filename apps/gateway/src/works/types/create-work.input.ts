import { Field, InputType } from '@nestjs/graphql';
import { ICreateWorkRequest } from '@manga-love-api/work/types';
import { ConstraintFormat, ConstraintValidator } from '../../common/decorators';
import { GraphQLUpload, FileUpload } from '../../common/types';

@InputType()
export class CreateWorkInput implements Omit<ICreateWorkRequest, 'illustration'> {
    @Field()
    public titleEn: string;

    @Field()
    public titleUa: string;

    @Field((returns) => [String])
    @ConstraintValidator({ format: ConstraintFormat.UUID, minItems: 1 })
    public categories: string[];

    @Field((returns) => GraphQLUpload)
    public illustration: Promise<FileUpload>;
}
