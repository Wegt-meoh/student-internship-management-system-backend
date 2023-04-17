import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentPostDto {
  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsNumber()
  post_id: number;
}
