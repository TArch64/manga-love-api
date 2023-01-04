import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IStatusResponse } from '@manga-love-api/core/status-response';
import { User } from '@manga-love-api/database';
import { IAuthResponse, ISignInRequest, ISignUpRequest } from './types';
import { AuthenticationService, SignInService, SignUpService, VerifyEmailService } from './services';
import { SignUpValidator } from './validators';

@Controller()
export class AuthController {
    @Inject()
    private signUpValidator: SignUpValidator;

    @Inject()
    private signUpService: SignUpService;

    @Inject()
    private signInService: SignInService;

    @Inject()
    private verifyEmailService: VerifyEmailService;

    @Inject()
    private authenticationService: AuthenticationService;

    @MessagePattern('sign-up')
    public async signUp(payload: ISignUpRequest): Promise<IAuthResponse> {
        await this.signUpValidator.validate(payload);
        return this.signUpService.signUp(payload);
    }

    @MessagePattern('sign-in')
    public async signIn(payload: ISignInRequest): Promise<IAuthResponse> {
        return this.signInService.signIn(payload);
    }

    @MessagePattern('verify-email')
    public async verifyEmail(code: string): Promise<IStatusResponse> {
        return { success: await this.verifyEmailService.verify(code) };
    }

    @MessagePattern('authenticate')
    public async authenticate(token: string): Promise<User | null> {
        return this.authenticationService.authenticate(token);
    }
}
