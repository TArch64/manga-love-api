import { Field, ObjectType } from '@nestjs/graphql';
import { IAuthResponse } from '@manga-love-api/auth/types';

@ObjectType()
export class AuthObject implements IAuthResponse {
    @Field()
    public token: string;
}
