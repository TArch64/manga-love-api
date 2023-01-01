import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
    @MessagePattern('hello')
    public getHello(): string {
        return 'hello world';
    }
}
