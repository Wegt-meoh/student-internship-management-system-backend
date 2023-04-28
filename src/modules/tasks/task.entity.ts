import { PostEntity } from 'src/modules/post/post.entity';
import { Report } from 'src/modules/report/report.entity';
import { User } from 'src/modules/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'attachment_url', nullable: true })
  attachmentUrl: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    comment: '创建时间',
  })
  createDate: Date;

  @ManyToOne(() => User, (user) => user.taskList, { onDelete: 'CASCADE' })
  createdUser: User;

  @ManyToOne(() => PostEntity, (post) => post.taskList, { onDelete: 'CASCADE' })
  targetPost: PostEntity;

  @OneToMany(() => Report, (report) => report.task, { cascade: ['remove'] })
  receivedReportList: Report[];
}
