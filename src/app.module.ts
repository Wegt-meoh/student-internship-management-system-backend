import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './security/jwt.strategy';
import { TeacherModule } from './modules/teacher/teacher.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'todos',
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      secret: 'sadkljflkajdfasjf',
      signOptions: { expiresIn: '4h' },
    }),
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
