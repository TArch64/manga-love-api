import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@manga-love-api/database';
import { UserObject } from './types';

@Resolver((of) => UserObject)
export class UsersResolver {
    @Inject()
    private prisma: PrismaService;

    @Query((returns) => [UserObject])
    public async users(): Promise<UserObject[]> {
        return this.prisma.user.findMany();
    }
}
