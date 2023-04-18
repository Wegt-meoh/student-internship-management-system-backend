import { StudentPostStatus } from 'src/enums/student-post-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'post_id' })
  postId: number;

  @Column({ default: StudentPostStatus.PEDING })
  status: StudentPostStatus;
}
