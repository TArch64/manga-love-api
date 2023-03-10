import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@manga-love-api/core/environment';
import { BullAdminService } from './bull-admin.service';
import { queueModules } from './bull-admin.queues';

@Module({
    imports: [
        EnvironmentModule,
        ...queueModules,
    ],
    providers: [
        BullAdminService,
    ],
})
export class BullAdminModule {}
