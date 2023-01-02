import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MailerController {
    @MessagePattern('send')
    public async send(): Promise<void> {

    }
}
