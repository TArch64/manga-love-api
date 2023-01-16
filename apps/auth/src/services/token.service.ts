import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentService } from '@manga-love-api/core/environment';

@Injectable()
export class TokenService {
    @Inject()
    private jwtService: JwtService;

    @Inject()
    private environment: EnvironmentService;

    public encode<TPayload extends object>(payload: TPayload): Promise<string> {
        return this.jwtService.signAsync(payload, { expiresIn: this.environment.jwt.expiration });
    }

    public decode<TPayload extends object>(token: string): Promise<TPayload> {
        return this.jwtService.verifyAsync<TPayload>(token);
    }

    public decodeSafe<TPayload extends object>(token: string): Promise<TPayload | null> {
        return this.decode<TPayload>(token).catch(() => null);
    }
}
