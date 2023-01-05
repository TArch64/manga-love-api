import process from 'process';
import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { constraintDirective } from 'graphql-constraint-directive';
import { constraintDirectiveTypeDefsObj } from 'graphql-constraint-directive/lib/type-defs';
import { ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule } from '@manga-love-api/database';
import { Request, Response } from 'express';
import { EnvironmentModule } from '@manga-love-api/core/environment';
import { APP_GUARD } from '@nestjs/core';
import { MicroservicesModule } from './microservices.config';
import { UsersResolver } from './users';
import { AuthController, AuthGuard, AuthResolver } from './auth';
import { WorkCategoriesResolver, WorksResolver } from './works';
import { UploadReceiverService } from './common/services';

interface GraphqlContext {
    req: Request;
    res: Response;
}

@Module({
    imports: [
        GraphQLModule.forRootAsync({
            driver: ApolloDriver,
            useFactory: () => ({
                autoSchemaFile: path.resolve(process.cwd(), 'schema.graphql'),
                sortSchema: true,
                transformSchema: constraintDirective(),
                buildSchemaOptions: {
                    directives: [constraintDirectiveTypeDefsObj],
                },
                playground: false,
                introspection: true,
                context: ({ req, res }): GraphqlContext => ({ req, res }),
            }),
        }),
        EnvironmentModule,
        MicroservicesModule,
        DatabaseModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthResolver,
        UsersResolver,
        WorksResolver,
        WorkCategoriesResolver,
        UploadReceiverService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class GatewayModule {}
