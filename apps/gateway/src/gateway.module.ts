import process from 'process';
import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { constraintDirective } from 'graphql-constraint-directive';
import { constraintDirectiveTypeDefsObj } from 'graphql-constraint-directive/lib/type-defs';
import { ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule } from '@manga-love-api/database';
import { Request, Response } from 'express';
import { EnvironmentModule, EnvironmentService } from '@manga-love-api/core/environment';
import { MicroservicesModule } from './microservices.config';
import { UsersResolver } from './users';
import { AuthController, AuthResolver } from './auth';

interface GraphqlContext {
    req: Request;
    res: Response;
}

@Module({
    imports: [
        GraphQLModule.forRootAsync({
            driver: ApolloDriver,
            inject: [EnvironmentService],
            useFactory: (environment: EnvironmentService) => ({
                autoSchemaFile: path.resolve(process.cwd(), 'schema.graphql'),
                sortSchema: true,
                transformSchema: constraintDirective(),
                buildSchemaOptions: {
                    directives: [constraintDirectiveTypeDefsObj],
                },
                playground: environment.isDevelopment ? {
                    settings: { 'editor.theme': 'light' },
                    endpoint: '/graphql',
                } : false,
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
    ],
})
export class GatewayModule {}
