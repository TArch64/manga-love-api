import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export function AuthenticatedOnly(): CustomDecorator<symbol> {
    return SetMetadata(AuthGuard.METADATA_KEY, true);
}
