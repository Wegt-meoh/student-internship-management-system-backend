import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { instanceToPlain } from 'class-transformer';

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

    const users = await this.userService.search({ phone });
    const user = users[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { phone };
      const token = this.jwtService.sign(payload);
      return { token, info: instanceToPlain(user) };
    } else {
      throw new BadRequestException('登录凭证检查失败，请重新登入');
    }
  }
}
