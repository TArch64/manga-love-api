import { Inject, Injectable } from '@nestjs/common';
import { IFilterWorksRequest } from '@manga-love-api/work/types';
import { PrismaService, Work } from '@manga-love-api/database';

@Injectable()
export class FilterWorksService {
    @Inject()
    private prisma: PrismaService;

    public async filter(filter: IFilterWorksRequest): Promise<Work[]> {
        return this.prisma.work.findMany({
            skip: filter.offset,
            take: filter.count,
            orderBy: { [filter.sort.field]: filter.sort.direction },
        });
    }
}
