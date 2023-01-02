import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { QLResponse } from '../common/decorators';
import { Microservices } from '../microservices.config';
import { AuthObject, SignUpInput } from './types';

@Resolver()
export class AuthResolver {
    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    @Mutation((returns) => AuthObject)
    public authSignUp(
        @Args('input') input: SignUpInput,
        @QLResponse() response: Response,
    ): Observable<AuthObject> {
        return this.authMicroservice.send<AuthObject>('sign-up', input);
    }
}
