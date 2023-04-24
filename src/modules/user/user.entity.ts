import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../../enums/Role.enum';
import { Exclude } from 'class-transformer';
import { PostEntity } from 'src/modules/post/post.entity';
import { Task } from 'src/modules/tasks/task.entity';
import { Report } from 'src/modules/report/report.entity';
import { RequestPost } from 'src/modules/requestPost/requestPost.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  role: RoleEnum;

  @Column({ nullable: true })
  class: string | null;

  @Column({ nullable: true })
  facuties: string | null;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToMany(() => PostEntity, (post) => post.createdUser)
  createPostList: PostEntity[];

  @OneToMany(() => Task, (task) => task.createdUser)
  taskList: Task[];

  @OneToMany(() => Report, (report) => report.user)
  reportList: Report[];

  @OneToMany(() => RequestPost, (requestPost) => requestPost.requestUser)
  requestPost: RequestPost[];
}
