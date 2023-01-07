import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@manga-love-api/core/environment';
import { DatabaseModule } from '@manga-love-api/database';
import { WorkController } from './work.controller';
import { MicroservicesModule } from './work.microservices';
import { CreateWorkService, FilterWorksService } from './services';

@Module({
    imports: [
        EnvironmentModule,
        DatabaseModule,
        MicroservicesModule,
    ],
    controllers: [WorkController],
    providers: [
        CreateWorkService,
        FilterWorksService,
    ],
})
export class WorkModule {}
