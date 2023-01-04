import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Microservices } from '../microservices.config';
import { AuthObject, SignInInput, SignUpInput } from './types';

@Resolver()
export class AuthResolver {
    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    @Mutation((returns) => AuthObject)
    public authSignUp(@Args('input') input: SignUpInput): Observable<AuthObject> {
        return this.authMicroservice.send<AuthObject>('sign-up', input);
    }

    @Mutation((returns) => AuthObject)
    public authSignIn(@Args('input') input: SignInInput): Observable<AuthObject> {
        return this.authMicroservice.send<AuthObject>('sign-in', input);
    }
}
