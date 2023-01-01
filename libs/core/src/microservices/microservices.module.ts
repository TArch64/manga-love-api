import { DynamicModule, InjectionToken } from '@nestjs/common';
import { ClientsModule, Transport, ClientsProviderAsyncOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { MICROSERVICES } from './microservices';

type MicroserviceKey = keyof typeof MICROSERVICES;
type MicroserviceTokens<ServiceKey extends MicroserviceKey> = Partial<Record<ServiceKey, InjectionToken>>;

export interface MicroservicesProvider<ServiceKey extends MicroserviceKey> {
    Microservices: MicroserviceTokens<ServiceKey>;
    MicroservicesModule: DynamicModule;
}

export class MicroservicesFactoryModule {
    public static create<ServiceKey extends MicroserviceKey>(...microservices: ServiceKey[]): MicroservicesProvider<ServiceKey> {
        const tokens = MicroservicesFactoryModule.createTokens(microservices);
        const clientsModule = MicroservicesFactoryModule.createClientsModule(tokens);

        return {
            Microservices: tokens,
            MicroservicesModule: clientsModule,
        };
    }

    private static createTokens<ServiceKey extends MicroserviceKey>(microservices: ServiceKey[]): MicroserviceTokens<ServiceKey> {
        const tokens: MicroserviceTokens<ServiceKey> = {};

        for (const key of microservices) {
            tokens[key] = Symbol(`${key}_MICROSERVICE`);
        }

        return tokens;
    }

    private static createClientsModule<ServiceKey extends MicroserviceKey>(tokens: MicroserviceTokens<ServiceKey>): DynamicModule {
        const clients = Object.entries(tokens).map(([key, token]): ClientsProviderAsyncOptions => ({
            name: token as symbol,
            inject: [ConfigService],
            useFactory: (config) => ({
                transport: Transport.NATS,
                options: {
                    servers: [config.getOrThrow('NATS_URL')],
                    queue: `${key}_QUEUE`,
                },
            }),
        }));
        const module = ClientsModule.registerAsync(clients);

        module.global = true;

        return module;
    }
}
