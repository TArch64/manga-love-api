import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IStatusResponse } from '@manga-love-api/core/status-response';
import { IAuthResponse, ISignUpRequest } from './types';
import { SignUpService, VerifyEmailService } from './services';
import { SignUpValidator } from './validators';

@Controller()
export class AuthController {
    @Inject()
    private signUpValidator: SignUpValidator;

    @Inject()
    private signUpService: SignUpService;

    @Inject()
    private verifyEmailService: VerifyEmailService;

    @MessagePattern('sign-up')
    public async signUp(payload: ISignUpRequest): Promise<IAuthResponse> {
        await this.signUpValidator.validate(payload);
        return this.signUpService.signUp(payload);
    }

    @MessagePattern('verify-email')
    public async verifyEmail(code: string): Promise<IStatusResponse> {
        return { success: await this.verifyEmailService.verify(code) };
    }
}
