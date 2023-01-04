import { Observable, switchMap, tap } from 'rxjs';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@manga-love-api/database';
import { Microservices } from '../microservices.config';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    public async intercept(context: ExecutionContext, next: CallHandler<unknown>): Promise<Observable<unknown>> {
        const { req } = GqlExecutionContext.create(context).getContext();
        const token = req.headers.authorization;

        return this.authMicroservice.send<User>('authenticate', token).pipe(
            tap((user: User | null) => req.user = user),
            switchMap(() => next.handle()),
        );
    }
}
