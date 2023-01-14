import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { FileUpload, GraphQLUpload } from '../../common/types';

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @IsOptional()
    @MinLength(3)
    @MaxLength(255)
    public username?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    public email?: string;

    @Field({ nullable: true })
    @IsOptional()
    @MinLength(8)
    @MaxLength(255)
    public password?: string;

    @Field((returns) => GraphQLUpload, { nullable: true })
    public avatar?: Promise<FileUpload>;
}
