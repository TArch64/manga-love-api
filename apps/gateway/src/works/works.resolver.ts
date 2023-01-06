import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ICreateWorkRequest } from '@manga-love-api/work/types';
import { Observable } from 'rxjs';
import { WorkCommand } from '@manga-love-api/work/work.command';
import { SuccessObject } from '../common/types';
import { Microservices } from '../gateway.microservices';
import { UploadReceiverService } from '../common/services';
import { CreateWorkInput } from './types';

@Resolver()
export class WorksResolver {
    @Inject(Microservices.WORK)
    private workMicroservice: ClientProxy;

    @Inject()
    private uploadService: UploadReceiverService;

    @Mutation((returns) => SuccessObject)
    public async workCreate(@Args('input') { illustration, ...input }: CreateWorkInput): Promise<Observable<SuccessObject>> {
        const request: ICreateWorkRequest = {
            ...input,
            illustration: await this.uploadService.receiveFile(await illustration),
        };
        return this.workMicroservice.send(WorkCommand.CREATE_WORK, request).pipe(SuccessObject.mapTo);
    }
}
