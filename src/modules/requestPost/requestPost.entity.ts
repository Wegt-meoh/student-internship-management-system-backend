import { RequestPostStatus } from 'src/enums/RequestPostStatus.enum';
import { User } from 'src/modules/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class RequestPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.requestPost, { onDelete: 'CASCADE' })
  requestUser: User;

  @ManyToOne(() => PostEntity, (post) => post.requested, {
    onDelete: 'CASCADE',
  })
  targetPost: PostEntity;

  @Column({ default: RequestPostStatus.PEDING })
  status: RequestPostStatus;
}
