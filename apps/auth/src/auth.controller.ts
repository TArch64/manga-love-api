import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IAuthResponse, ISignUpRequest } from './types';
import { SignUpService } from './services';
import { SignUpValidator } from './validators';

@Controller()
export class AuthController {
    @Inject()
    private signUpValidator: SignUpValidator;

    @Inject()
    private signUpService: SignUpService;

    @MessagePattern('sign-up')
    public async signUp(payload: ISignUpRequest): Promise<IAuthResponse> {
        await this.signUpValidator.validate(payload);
        return this.signUpService.signUp(payload);
    }
}
