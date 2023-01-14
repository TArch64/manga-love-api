import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IStatusResponse } from '@manga-love-api/core/status-response';
import { User } from '@manga-love-api/database';
import { IAuthResponse, ISignInRequest, ISignUpRequest } from './types';
import { AuthenticationService, SignInService, SignUpService, VerifyEmailService } from './services';
import { SignUpValidator } from './validators';
import { AuthCommand } from './auth.command';

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

    @MessagePattern(AuthCommand.SIGN_UP)
    public async signUp(payload: ISignUpRequest): Promise<IAuthResponse> {
        await this.signUpValidator.validate(payload);
        return this.signUpService.signUp(payload);
    }

    @MessagePattern(AuthCommand.SIGN_IN)
    public signIn(payload: ISignInRequest): Promise<IAuthResponse> {
        return this.signInService.signIn(payload);
    }

    @MessagePattern(AuthCommand.VERIFY_EMAIL)
    public async verifyEmail(code: string): Promise<IStatusResponse> {
        return { success: await this.verifyEmailService.verify(code) };
    }

    @MessagePattern(AuthCommand.AUTHENTICATE)
    public authenticate(token: string): Promise<User | null> {
        return this.authenticationService.authenticate(token);
    }

    @MessagePattern(AuthCommand.SEND_EMAIL_VERIFICATION)
    public async sendEmailVerification(user: User): Promise<IStatusResponse> {
        await this.verifyEmailService.send(user);
        return { success: true };
    }
}
