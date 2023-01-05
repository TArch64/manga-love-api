import { Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@manga-love-api/database';
import { WorkCategoryObject } from './types';

@Resolver()
export class WorkCategoriesResolver {
    @Inject()
    private prisma: PrismaService;

    @Query((returns) => [WorkCategoryObject])
    public workCategories(): Promise<WorkCategoryObject[]> {
        return this.prisma.workCategory.findMany();
    }
}
