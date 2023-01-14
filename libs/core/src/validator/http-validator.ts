import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Validator } from './validator';

@Injectable()
export abstract class HttpValidator<TInput extends object> extends Validator<TInput> {
    protected reject(code: string): never {
        throw new HttpException(code, HttpStatus.BAD_REQUEST);
    }
}
