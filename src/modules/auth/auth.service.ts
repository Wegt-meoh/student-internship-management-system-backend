import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { phone, password } = authCredentialsDto;

    const user = await this.userService.findOne(phone);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { phone };
      const token = this.jwtService.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException('登录凭证检查失败，请重新登入');
    }
  }
}
