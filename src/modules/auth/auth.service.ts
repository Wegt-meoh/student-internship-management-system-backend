import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  getJwtSecret() {
    return this.configService.get('JWT_SECRET');
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { phone, password } = authCredentialsDto;

    const user = await this.userService.findOneByPhone(phone);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { phone };
      const token = this.jwtService.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException('登录凭证检查失败，请重新登入');
    }
  }

  async verifyAsync(token: string, option: JwtVerifyOptions) {
    return this.jwtService.verifyAsync(token, option);
  }
}
