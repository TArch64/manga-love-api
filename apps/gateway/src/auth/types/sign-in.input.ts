import { Field, InputType } from '@nestjs/graphql';
import { ISignInRequest } from '@manga-love-api/auth/types';

@InputType()
export class SignInInput implements ISignInRequest {
    @Field()
    public username: string;

    @Field()
    public password: string;
}
