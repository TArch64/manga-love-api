import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService, User } from '@manga-love-api/database';
import { AuthenticatedOnly, CurrentUser } from '../auth';
import { IllustrationObject } from '../illustrations';
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

    @ResolveField((returns) => IllustrationObject)
    public avatar(@Parent() user: UserObject): Promise<IllustrationObject> {
        return this.prisma.illustration.findUnique({
            where: { id: user.avatarId },
        });
    }
}
