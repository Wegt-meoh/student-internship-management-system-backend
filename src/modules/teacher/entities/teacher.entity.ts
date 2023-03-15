import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('char')
  phone: string;
  @Column('char')
  name: string;
  @Column('varchar')
  password: string;
  @Column('varchar')
  salt: string;
}
