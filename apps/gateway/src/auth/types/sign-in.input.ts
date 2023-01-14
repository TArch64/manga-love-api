import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ISignInRequest } from '@manga-love-api/auth/types';

@InputType()
export class SignInInput implements ISignInRequest {
    @Field()
    @IsNotEmpty()
    public username: string;

    @Field()
    @IsNotEmpty()
    public password: string;
}
