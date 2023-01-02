import process from 'process';
import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { constraintDirective } from 'graphql-constraint-directive';
import { constraintDirectiveTypeDefsObj } from 'graphql-constraint-directive/lib/type-defs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from '@manga-love-api/database';
import { MicroservicesModule } from './microservices.config';
import { UsersResolver } from './users';
import { AuthResolver } from './auth';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'schema.graphql'),
            sortSchema: true,
            transformSchema: constraintDirective(),
            buildSchemaOptions: {
                directives: [constraintDirectiveTypeDefsObj],
            },
            playground: {
                settings: { 'editor.theme': 'light' },
                endpoint: '/graphql',
            },
            introspection: true,
            context: ({ req, res }) => ({ req, res }),
        }),
        MicroservicesModule,
        DatabaseModule,
    ],
    providers: [
        AuthResolver,
        UsersResolver,
    ],
})
export class GatewayModule {}
