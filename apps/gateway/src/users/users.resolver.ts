import { Resolver, Query, ResolveField, Parent, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService, User } from '@manga-love-api/database';
import { AuthenticatedOnly, CurrentUser } from '../auth';
import { IllustrationObject } from '../illustrations';
import { UpdateUserInput, UserObject } from './types';
import { UpdateUserService } from './services';
import { UpdateUserValidator } from './validators';

@Resolver((of) => UserObject)
export class UsersResolver {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private updateService: UpdateUserService;

    @Inject()
    private updateValidator: UpdateUserValidator;

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

    @Mutation((returns) => UserObject)
    @AuthenticatedOnly()
    public async currentUserUpdate(
        @CurrentUser() user: User,
        @Args('input') input: UpdateUserInput,
    ): Promise<UserObject> {
        await this.updateValidator.validate(input);
        return this.updateService.update(user, input);
    }
}
