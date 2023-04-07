import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Teacher } from '../entities/teacher.entity';
import { TokenDecodeInfo } from '../vo/token-decode.vo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sadkljflkajdfasjf',
    });
  }

  async validate(payload: Teacher): Promise<TokenDecodeInfo> {
    return {
      id: payload.id,
      phone: payload.phone,
      name: payload.name,
      facuties: payload.facuties,
    };
  }
}
