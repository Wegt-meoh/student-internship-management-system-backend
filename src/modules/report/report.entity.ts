import { Task } from 'src/modules/tasks/task.entity';
import { User } from 'src/modules/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reportList)
  user: User;

  @ManyToOne(() => Task, (task) => task.receivedReportList)
  task: Task;

  @Column({ comment: 'oss url', name: 'attachment_url' })
  attachmentUrl: string;

  @Column({ nullable: true })
  score: number | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    comment: '创建时间',
  })
  createDate: Date;
}
