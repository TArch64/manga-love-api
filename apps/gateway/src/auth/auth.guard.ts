import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, of, tap } from 'rxjs';
import { User } from '@manga-love-api/database';
import { Request } from 'express';
import { Microservices } from '../microservices.config';

@Injectable()
export class AuthGuard implements CanActivate {
    public static readonly METADATA_KEY = Symbol(AuthGuard.name);

    @Inject()
    private reflector: Reflector;

    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    public canActivate(httpContext: ExecutionContext): boolean | Observable<boolean> {
        const context = GqlExecutionContext.create(httpContext);

        if (!this.isAuthRequired(context)) return true;

        const { req } = context.getContext();

        return this.authenticate(req).pipe(
            tap((user: User | null) => req.user = user),
            map((user: User | null) => !!user),
        );
    }

    private isAuthRequired(context: GqlExecutionContext): boolean {
        const targets = [context.getClass(), context.getHandler()];
        const metadata = this.reflector.getAll(AuthGuard.METADATA_KEY, targets);
        return metadata.some((layer) => !!layer);
    }

    private authenticate(request: Request): Observable<User | null> {
        const token = request.headers.authorization;
        return token ? this.authMicroservice.send<User>('authenticate', token) : of(null);
    }
}
