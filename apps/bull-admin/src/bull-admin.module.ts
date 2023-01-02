import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullAdminService } from './bull-admin.service';
import { queueModules } from './queues.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ...queueModules,
    ],
    providers: [
        BullAdminService,
    ],
})
export class BullAdminModule {}
