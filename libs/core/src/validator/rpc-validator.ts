import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export type RpcValidatorResult = Promise<void | never>;
export type RpcValidatorCheck<TInput extends object> = (input: TInput) => RpcValidatorResult;

@Injectable()
export abstract class RpcValidator<TInput extends object> {
    protected abstract checks: RpcValidatorCheck<TInput>[];

    public async validate(input: TInput): Promise<true | never> {
        for (const check of this.checks) {
            await check.call(this, input);
        }
        return true;
    }

    protected reject(code: string): never {
        throw new RpcException(code);
    }
}
