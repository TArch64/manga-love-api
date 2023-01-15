import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    @Inject()
    private jwtService: JwtService;

    public encode<TPayload extends object>(payload: TPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }

    public decode<TPayload extends object>(token: string): Promise<TPayload> {
        return this.jwtService.verifyAsync<TPayload>(token);
    }

    public decodeSafe<TPayload extends object>(token: string): Promise<TPayload | null> {
        return this.decode<TPayload>(token).catch((error) => {
            console.log('error', error);
            return null;
        });
    }
}
