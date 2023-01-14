import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ISignUpRequest } from '@manga-love-api/auth/types';
import { GraphQLUpload, FileUpload } from '../../common/types';

@InputType()
export class SignUpInput implements Omit<ISignUpRequest, 'avatar'> {
    @Field()
    @MinLength(3)
    @MaxLength(255)
    public username: string;

    @Field()
    @IsEmail()
    public email: string;

    @Field()
    @MinLength(8)
    @MaxLength(255)
    public password: string;

    @Field((returns) => GraphQLUpload, { nullable: true })
    public avatar?: Promise<FileUpload>;
}
