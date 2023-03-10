import { Inject, Injectable } from '@nestjs/common';
import { RpcValidator, ValidatorCheck, ValidatorCheckResult } from '@manga-love-api/core/validator';
import { PrismaService } from '@manga-love-api/database';
import { ISignUpRequest } from '../types';

@Injectable()
export class SignUpValidator extends RpcValidator<ISignUpRequest> {
    @Inject()
    private prisma: PrismaService;

    protected checks: ValidatorCheck<ISignUpRequest>[] = [
        this.isEmailFree,
        this.isUsernameFree,
    ];

    private async isEmailFree(input: ISignUpRequest): ValidatorCheckResult {
        const count = await this.prisma.user.count({
            where: { email: input.email },
        });
        if (count > 0) this.reject('auth-email-used');
    }

    private async isUsernameFree(input: ISignUpRequest): ValidatorCheckResult {
        const count = await this.prisma.user.count({
            where: { username: input.username },
        });
        if (count > 0) this.reject('auth-username-used');
    }
}
