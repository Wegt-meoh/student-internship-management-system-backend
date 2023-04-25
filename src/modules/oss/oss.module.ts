import { Module } from '@nestjs/common';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OssEntity } from './oss.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OssEntity])],
  controllers: [OssController],
  providers: [OssService],
  exports: [OssService],
})
export class OssModule {}
