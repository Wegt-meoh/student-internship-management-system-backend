import { StudentPostStatus } from 'src/enums/student-post-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @Column()
  post_id: number;

  @Column({ default: StudentPostStatus.PEDING })
  status: StudentPostStatus;
}
