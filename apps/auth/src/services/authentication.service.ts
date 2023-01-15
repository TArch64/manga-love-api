import { Inject, Injectable } from '@nestjs/common';
import { PrismaService, User } from '@manga-love-api/database';
import { TokenService } from './token.service';

export interface IAuthenticationPayload {
    userId: string;
}

@Injectable()
export class AuthenticationService {
    @Inject()
    private tokenService: TokenService;

    @Inject()
    private prisma: PrismaService;

    public async authenticate(token: string): Promise<User | null> {
        const payload = await this.tokenService.decodeSafe<IAuthenticationPayload>(token);

        console.log('Payload', payload);

        const user = payload?.userId && await this.prisma.user.findUnique({
            where: { id: payload.userId },
        });

        return user || null;
    }
}
