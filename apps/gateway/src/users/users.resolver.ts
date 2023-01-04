import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService, User } from '@manga-love-api/database';
import { AuthenticatedOnly, CurrentUser } from '../auth';
import { UserObject } from './types';

@Resolver((of) => UserObject)
export class UsersResolver {
    @Inject()
    private prisma: PrismaService;

    @Query((returns) => UserObject)
    @AuthenticatedOnly()
    public async currentUser(@CurrentUser() user: User): Promise<UserObject> {
        return user;
    }
}
