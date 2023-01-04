import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService, User } from '@manga-love-api/database';
import { QLCurrentUser } from '../auth';
import { UserObject } from './types';

@Resolver((of) => UserObject)
export class UsersResolver {
    @Inject()
    private prisma: PrismaService;

    @Query((returns) => UserObject)
    public async currentUser(@QLCurrentUser() user: User): Promise<UserObject> {
        return user;
    }
}
