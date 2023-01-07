import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCommand } from '@manga-love-api/auth/auth.command';
import { ISignUpRequest } from '@manga-love-api/auth/types';
import { Microservices } from '../gateway.microservices';
import { UploadReceiverService } from '../common/services';
import { AuthObject, SignInInput, SignUpInput } from './types';

@Resolver()
export class AuthResolver {
    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    @Inject()
    private uploaderService: UploadReceiverService;

    @Mutation((returns) => AuthObject)
    public async authSignUp(@Args('input') { avatar, ...input }: SignUpInput): Promise<Observable<AuthObject>> {
        const request: ISignUpRequest = {
            ...input,
            avatar: avatar ? await this.uploaderService.receiveFile(await avatar) : null,
        };
        return this.authMicroservice.send<AuthObject, ISignUpRequest>(AuthCommand.SIGN_UP, request);
    }

    @Mutation((returns) => AuthObject)
    public authSignIn(@Args('input') input: SignInInput): Observable<AuthObject> {
        return this.authMicroservice.send<AuthObject>(AuthCommand.SIGN_IN, input);
    }
}
