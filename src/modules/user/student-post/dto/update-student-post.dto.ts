import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StudentPostStatus } from 'src/enums/student-post-status.enum';

export class UpdateStudentPostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEnum(StudentPostStatus)
  status: StudentPostStatus;
}
