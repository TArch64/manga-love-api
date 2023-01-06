import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCommand } from '@manga-love-api/auth/auth.command';
import { Microservices } from '../gateway.microservices';
import { AuthObject, SignInInput, SignUpInput } from './types';

@Resolver()
export class AuthResolver {
    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    @Mutation((returns) => AuthObject)
    public authSignUp(@Args('input') input: SignUpInput): Observable<AuthObject> {
        return this.authMicroservice.send<AuthObject>(AuthCommand.SIGN_UP, input);
    }

    @Mutation((returns) => AuthObject)
    public authSignIn(@Args('input') input: SignInInput): Observable<AuthObject> {
        return this.authMicroservice.send<AuthObject>(AuthCommand.SIGN_IN, input);
    }
}
