import { Inject, Injectable } from '@nestjs/common';
import { HttpValidator, ValidatorCheck, ValidatorCheckResult } from '@manga-love-api/core/validator';
import { PrismaService } from '@manga-love-api/database';
import { UpdateUserInput } from '../types';

@Injectable()
export class UpdateUserValidator extends HttpValidator<UpdateUserInput> {
    @Inject()
    private prisma: PrismaService;

    protected checks: ValidatorCheck<UpdateUserInput>[] = [
        this.isEmailFree,
        this.isUsernameFree,
    ];

    private async isEmailFree(input: UpdateUserInput): ValidatorCheckResult {
        if (!input.email) return;

        const count = await this.prisma.user.count({
            where: { email: input.email },
        });
        if (count > 0) this.reject('auth-email-used');
    }

    private async isUsernameFree(input: UpdateUserInput): ValidatorCheckResult {
        if (!input.username) return;

        const count = await this.prisma.user.count({
            where: { username: input.username },
        });
        if (count > 0) this.reject('auth-username-used');
    }
}
