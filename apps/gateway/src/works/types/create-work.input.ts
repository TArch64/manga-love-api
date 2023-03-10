import { Field, InputType } from '@nestjs/graphql';
import { ArrayMinSize } from 'class-validator';
import { ICreateWorkRequest } from '@manga-love-api/work/types';
import { GraphQLUpload, GraphQLUUID, FileUpload } from '../../common/types';

@InputType()
export class CreateWorkInput implements Omit<ICreateWorkRequest, 'illustration'> {
    @Field()
    public titleEn: string;

    @Field()
    public titleUa: string;

    @Field((returns) => [GraphQLUUID])
    @ArrayMinSize(1)
    public categories: string[];

    @Field((returns) => GraphQLUpload)
    public illustration: Promise<FileUpload>;
}
