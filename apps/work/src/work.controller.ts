import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Work } from '@manga-love-api/database';
import { IStatusResponse } from '@manga-love-api/core/status-response';
import { ICreateWorkRequest } from './types';

@Controller()
export class WorkController {
    @MessagePattern('create-work')
    public async createWork(payload: ICreateWorkRequest): Promise<IStatusResponse> {
        console.log(payload);
        return { success: true };
    }
}
