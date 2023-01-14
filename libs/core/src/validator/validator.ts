import { Injectable } from '@nestjs/common';

export type ValidatorCheck<TInput extends object> = (input: TInput) => ValidatorCheckResult;
export type ValidatorCheckResult = Promise<void | never>;
export type ValidatorResult = Promise<true | never>;

@Injectable()
export abstract class Validator<TInput extends object> {
    protected abstract checks: ValidatorCheck<TInput>[];

    public async validate(input: TInput): ValidatorResult {
        for (const check of this.checks) {
            await check.call(this, input);
        }
        return true;
    }

    protected abstract reject(code: string): never;
}
