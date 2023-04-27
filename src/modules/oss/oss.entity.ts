import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OssEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @ApiProperty({ description: '上传用户id' })
  @Column({ type: 'bigint', name: 'user_id', comment: '上传用户id' })
  public userId: number;

  @ApiProperty({ description: '文件 url' })
  @Column({ type: 'varchar', comment: '文件 url' })
  public url: string;

  @ApiProperty({ description: '文件size' })
  @Column({ type: 'int', comment: '文件size' })
  public size: number;

  @Column()
  fileName: string;

  @ApiProperty({ description: '文件mimetype类型' })
  @Column({ type: 'varchar', comment: '文件mimetype类型' })
  public type: string;

  @ApiProperty({
    description: '业务描述字段，可以字符串，也可以是 JSON 字符串',
  })
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    comment: '业务描述字段，可以字符串，也可以是 JSON 字符串',
  })
  public comment: string | null;

  @Exclude({ toPlainOnly: true }) // 输出屏蔽
  @Column({ type: 'varchar', length: 200, comment: '文件存放位置' })
  public location: string;

  @ApiProperty({ description: '上传时间', example: '2023-04-24T18:46:42.017Z' })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    comment: '创建时间',
  })
  createDate: Date | string;
}
