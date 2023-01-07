import { Inject, Injectable } from '@nestjs/common';
import { IFilterWorksRequest, IFilterWorksSort } from '@manga-love-api/work/types';
import { Prisma, PrismaService, Work } from '@manga-love-api/database';

@Injectable()
export class FilterWorksService {
    @Inject()
    private prisma: PrismaService;

    public async filter(filter: IFilterWorksRequest): Promise<Work[]> {
        return this.prisma.work.findMany({
            skip: filter.offset,
            take: filter.count,
            where: this.buildSearchQuery(filter),
            orderBy: this.buildSortQuery(filter.sort),
        });
    }

    private buildSortQuery(sort: IFilterWorksSort): Prisma.WorkFindManyArgs['orderBy'] {
        return { [sort.field]: sort.direction };
    }

    private buildSearchQuery(filter: IFilterWorksRequest): Prisma.WorkFindManyArgs['where'] {
        const textQuery = this.buildTextQuery(filter.text);
        const categoriesQuery = this.buildCategoriesQuery(filter.categories);

        if (textQuery && categoriesQuery) {
            return {
                AND: [
                    textQuery,
                    categoriesQuery,
                ],
            };
        }

        return textQuery || categoriesQuery;
    }

    private buildTextQuery(text: string): Prisma.WorkFindManyArgs['where'] {
        if (!text) return;

        return {
            OR: [
                {
                    titleUa: {
                        contains: text,
                        mode: 'insensitive',
                    },
                },
                {
                    titleEn: {
                        contains: text,
                        mode: 'insensitive',
                    },
                },
            ],
        };
    }

    private buildCategoriesQuery(categories: string[]): Prisma.WorkFindManyArgs['where'] {
        if (!categories) return undefined;

        return {
            categories: {
                some: {
                    categoryId: {
                        in: categories,
                    },
                },
            },
        };
    }
}
