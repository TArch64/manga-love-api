import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Work } from '@manga-love-api/database';
import { ICreateWorkRequest } from './types';
import { CreateWorkService } from './services';
import { WorkCommand } from './work.command';

@Controller()
export class WorkController {
    @Inject()
    private createWorkService: CreateWorkService;

    @MessagePattern(WorkCommand.CREATE_WORK)
    public async createWork(payload: ICreateWorkRequest): Promise<Work> {
        return this.createWorkService.create(payload);
    }
}
