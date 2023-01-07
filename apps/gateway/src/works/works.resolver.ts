import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ICreateWorkRequest } from '@manga-love-api/work/types';
import { WorkCommand } from '@manga-love-api/work/work.command';
import { PrismaService } from '@manga-love-api/database';
import { Observable } from 'rxjs';
import { Microservices } from '../gateway.microservices';
import { UploadReceiverService } from '../common/services';
import { IllustrationObject } from '../illustrations';
import { CreateWorkInput, WorkCategoryObject, WorkFilterInput, WorkGetArgs, WorkObject } from './types';

@Resolver((of) => WorkObject)
export class WorksResolver {
    @Inject(Microservices.WORK)
    private workMicroservice: ClientProxy;

    @Inject()
    private uploadService: UploadReceiverService;

    @Inject()
    private prisma: PrismaService;

    @Mutation((returns) => WorkObject)
    public async workCreate(@Args('input') { illustration, ...input }: CreateWorkInput): Promise<Observable<WorkObject>> {
        const request: ICreateWorkRequest = {
            ...input,
            illustration: await this.uploadService.receiveFile(await illustration),
        };
        return this.workMicroservice.send(WorkCommand.CREATE_WORK, request);
    }

    @Query((returns) => [WorkObject])
    public works(@Args('filter') filter: WorkFilterInput): Observable<WorkObject[]> {
        return this.workMicroservice.send(WorkCommand.FILTER_WORKS, filter);
    }

    @Query((returns) => WorkObject)
    public work(@Args() args: WorkGetArgs): Promise<WorkObject> {
        return this.prisma.work.findUnique({
            where: { id: args.id },
        });
    }

    @ResolveField((returns) => [WorkCategoryObject])
    public async categories(@Parent() work: WorkObject): Promise<WorkCategoryObject[]> {
        const relations = await this.prisma.work
            .findUnique({ where: { id: work.id } })
            .categories({ include: { category: true } });

        return relations.map((relation) => relation.category);
    }

    @ResolveField((returns) => IllustrationObject)
    public thumbnail(@Parent() work: WorkObject): Promise<IllustrationObject> {
        return this.prisma.illustration.findUnique({
            where: { id: work.thumbnailId },
        });
    }
}
