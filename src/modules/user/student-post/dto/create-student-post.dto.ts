import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentPostDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
