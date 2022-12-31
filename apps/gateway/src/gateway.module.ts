import { Module } from '@nestjs/common';
import { DatabaseModule } from '@manga-love-api/database';

@Module({
    imports: [DatabaseModule],
})
export class GatewayModule {}
