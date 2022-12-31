import { DynamicModule, FactoryProvider, InjectionToken } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const MICROSERVICES = {};

export interface MicroservicesProvider<ServiceKey extends keyof typeof MICROSERVICES> {
    MICROSERVICES: Record<ServiceKey, InjectionToken>;
    MicroservicesModule: DynamicModule;
}

export class MicroservicesFactoryModule {
    public static create<ServiceKey extends keyof typeof MICROSERVICES>(...microservices: ServiceKey[]): MicroservicesProvider<ServiceKey> {
        const tokens: Partial<Record<ServiceKey, InjectionToken>> = {};
        const providers = [];

        for (const serviceKey of microservices) {
            const service = this.provideMicroservice(serviceKey);

            tokens[serviceKey] = service.token;
            providers.push(service.provider);
        }

        return {
            MICROSERVICES: tokens as Record<ServiceKey, InjectionToken>,

            MicroservicesModule: {
                module: MicroservicesFactoryModule,
                providers,
                exports: providers,
                global: true,
            },
        };
    }

    private static provideMicroservice(name: keyof typeof MICROSERVICES): { token: InjectionToken, provider: FactoryProvider } {
        const token = Symbol(`${name}_MICROSERVICE`);
        const config = MICROSERVICES[name];

        const provider: FactoryProvider = {
            provide: token,

            useFactory: () => ClientProxyFactory.create({
                transport: Transport.TCP,
                // options: { host: config.host, port: 3000 },
            }),
        };

        return { token, provider };
    }
}
