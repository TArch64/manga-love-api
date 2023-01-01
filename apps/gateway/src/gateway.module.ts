import { Controller, Get, Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@manga-love-api/database';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Microservices, MicroservicesModule } from './microservices.config';

@Controller()
class ApiController {
    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    @Get()
    public get(): Observable<string> {
        return this.authMicroservice.send('hello', null);
    }
}

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MicroservicesModule,
    ],
    controllers: [ApiController],
})
export class GatewayModule {}
