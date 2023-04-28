import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Task } from '../tasks/task.entity';
import { RequestPost } from '../requestPost/requestPost.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @ManyToOne(() => User, (user) => user.createPostList, { onDelete: 'CASCADE' })
  createdUser: User;

  @Column()
  company: string;

  @Column()
  description: string;

  @OneToMany(() => Task, (task) => task.targetPost)
  taskList: Task[];

  @OneToMany(() => RequestPost, (requstPost) => requstPost.targetPost)
  requested: RequestPost[];
}
