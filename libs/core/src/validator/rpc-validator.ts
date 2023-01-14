import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Validator } from './validator';

@Injectable()
export abstract class RpcValidator<TInput extends object> extends Validator<TInput> {
    protected reject(code: string): never {
        throw new RpcException(code);
    }
}
