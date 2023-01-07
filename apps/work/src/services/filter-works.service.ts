import { Inject, Injectable } from '@nestjs/common';
import { IFilterWorksRequest, IFilterWorksResponse } from '@manga-love-api/work/types';
import { Prisma, PrismaService, Work } from '@manga-love-api/database';

type QueryCursor = Required<Pick<Prisma.WorkFindManyArgs, 'cursor' | 'skip'>> | {};

@Injectable()
export class FilterWorksService {
    @Inject()
    private prisma: PrismaService;

    public async filter({ cursor, count }: IFilterWorksRequest): Promise<IFilterWorksResponse> {
        const works = await this.prisma.work.findMany({
            ...this.buildCursorQuery(cursor),
            take: count,
            orderBy: { position: 'asc' },
        });
        return {
            list: works,
            cursor: this.getNextCursor(works),
        };
    }

    private buildCursorQuery(cursor: string): QueryCursor {
        if (!cursor) return {};

        return {
            skip: 1,
            cursor: { id: cursor },
        };
    }

    private getNextCursor(works: Work[]): string | null {
        return works.at(-1)?.id ?? null;
    }
}
