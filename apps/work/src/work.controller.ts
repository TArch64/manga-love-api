import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Work } from '@manga-love-api/database';
import { ICreateWorkRequest, IFilterWorksRequest } from './types';
import { CreateWorkService, FilterWorksService } from './services';
import { WorkCommand } from './work.command';

@Controller()
export class WorkController {
    @Inject()
    private createWorkService: CreateWorkService;

    @Inject()
    private filterWorksService: FilterWorksService;

    @MessagePattern(WorkCommand.CREATE_WORK)
    public async createWork(payload: ICreateWorkRequest): Promise<Work> {
        return this.createWorkService.create(payload);
    }

    @MessagePattern(WorkCommand.FILTER_WORKS)
    public async filterWorks(filter: IFilterWorksRequest): Promise<Work[]> {
        return this.filterWorksService.filter(filter);
    }
}
