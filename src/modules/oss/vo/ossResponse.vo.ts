import { OmitType } from '@nestjs/swagger';
import { OssEntity } from '../oss.entity';

export class OssResponseVo extends OmitType(OssEntity, ['location']) {}
