import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ICreateWorkRequest } from '@manga-love-api/work/types';
import { firstValueFrom, Observable } from 'rxjs';
import { SuccessObject } from '../common/types';
import { Microservices } from '../microservices.config';
import { UploadReceiverService } from '../common/services';
import { CreateWorkInput } from './types';

@Resolver()
export class WorksResolver {
    @Inject(Microservices.WORK)
    private workMicroservice: ClientProxy;

    @Inject()
    private uploadReceiverService: UploadReceiverService;

    @Mutation((returns) => SuccessObject)
    public async workCreate(@Args('input') { illustration, ...input }: CreateWorkInput): Promise<Observable<SuccessObject>> {
        const request: ICreateWorkRequest = {
            ...input,
            illustration: await this.uploadReceiverService.receiveFile(illustration),
        };
        return this.workMicroservice.send('create-work', request).pipe(SuccessObject.mapTo);
    }
}
