import {
  Injectable,
  InternalServerErrorException,
  UploadedFile,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { OssEntity } from './entities/oss.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream, existsSync, mkdirSync, statSync } from 'fs';
import * as MineType from 'mime-types';

@Injectable()
export class OssService {
  private uploadPath: string;
  private ossDomain: string;
  private ossServerRoot: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(OssEntity) private ossReposotory: Repository<OssEntity>,
  ) {
    const fileLocation: string = configService.get('FILE_LOCATION');
    if (path.isAbsolute(fileLocation)) {
      this.uploadPath = fileLocation;
    } else {
      this.uploadPath = path.join(process.cwd(), fileLocation);
    }

    this.uploadPath = path.normalize(this.uploadPath);
    this.ossDomain = configService.get('OSS_DOMAIN');
    this.ossServerRoot = configService.get('');

    if (
      !existsSync(this.uploadPath) ||
      !statSync(this.uploadPath).isDirectory()
    ) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async create(
    @UploadedFile() file: Express.Multer.File,
    comment: string,
    user: User,
  ) {
    const stroedFileName = `${uuidv4().replace(/-/g, '')}.${MineType.extension(
      file.mimetype,
    )}`;
    const storedFilePath = path.join(this.uploadPath, stroedFileName);
    const writeStream = createWriteStream(storedFilePath);
    writeStream.write(file.buffer, (err) => {
      if (err) {
        throw new InternalServerErrorException(err);
      }
      writeStream.close();
    });

    const ossObject = new OssEntity();
    ossObject.url = `${this.ossDomain}/${this.ossServerRoot}/${stroedFileName}`;
    ossObject.comment = comment;
    ossObject.location = storedFilePath;
    ossObject.size = file.size;
    ossObject.type = file.mimetype;
    ossObject.userId = user.id;

    return this.ossReposotory.save(ossObject);
  }

  findAll() {
    return this.ossReposotory.find();
  }

  findByUser(user: User) {
    return this.ossReposotory.findBy({ userId: user.id });
  }
}
