import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    @Inject()
    private jwtService: JwtService;

    public encode<TPayload extends object>(payload: TPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
}
