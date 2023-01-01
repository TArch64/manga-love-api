import * as process from 'process';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@manga-love-api/database';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MicroservicesModule } from './microservices.config';
import { UsersResolver } from './users';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'schema.graphql'),
            sortSchema: true,
        }),
        MicroservicesModule,
        DatabaseModule,
    ],
    providers: [
        UsersResolver,
    ],
})
export class GatewayModule {}
