import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Teacher } from '../entities/teacher.entity';
import { TokenDecodeInfo } from '../vo/token-decode.vo';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: Teacher): Promise<Teacher> {
    const { phone } = payload;
    const teacher = await this.teacherRepository.findOneBy({ phone });

    if (!teacher) {
      throw new UnauthorizedException();
    }

    return teacher;
  }
}
