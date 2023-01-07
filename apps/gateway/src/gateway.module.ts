import process from 'process';
import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { constraintDirective } from 'graphql-constraint-directive';
import { constraintDirectiveTypeDefsObj } from 'graphql-constraint-directive/lib/type-defs';
import { ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule, FieldSortOrder } from '@manga-love-api/database';
import { Request, Response } from 'express';
import { EnvironmentModule } from '@manga-love-api/core/environment';
import { APP_GUARD } from '@nestjs/core';
import { UploaderStorageModule } from '@manga-love-api/core/uploader-storage';
import { WorkSortField } from '@manga-love-api/work/types';
import { MicroservicesModule } from './gateway.microservices';
import { UsersResolver } from './users';
import { AuthController, AuthGuard, AuthResolver } from './auth';
import { WorkCategoriesResolver, WorksResolver } from './works';
import { UploadReceiverService } from './common/services';
import { IllustrationResolver } from './illustrations';

registerEnumType(WorkSortField, { name: 'WorkSortField' });
registerEnumType(FieldSortOrder, { name: 'FieldSortOrder' });

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
        UploaderStorageModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthResolver,
        UsersResolver,
        WorksResolver,
        IllustrationResolver,
        WorkCategoriesResolver,
        UploadReceiverService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class GatewayModule {}
