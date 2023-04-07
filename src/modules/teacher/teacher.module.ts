import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './security/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    JwtModule.register({
      secret: 'sadkljflkajdfasjf',
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, JwtStrategy],
})
export class TeacherModule {}
