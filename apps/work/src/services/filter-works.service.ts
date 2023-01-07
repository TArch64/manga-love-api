import { Inject, Injectable } from '@nestjs/common';
import { IFilterWorksRequest } from '@manga-love-api/work/types';
import { Prisma, PrismaService, Work } from '@manga-love-api/database';

type QueryCursor = Required<Pick<Prisma.WorkFindManyArgs, 'cursor' | 'skip'>> | {};

@Injectable()
export class FilterWorksService {
    @Inject()
    private prisma: PrismaService;

    public async filter(filter: IFilterWorksRequest): Promise<Work[]> {
        return this.prisma.work.findMany({
            skip: filter.offset,
            take: filter.count,
            orderBy: { updatedAt: 'desc' },
        });
    }
}
