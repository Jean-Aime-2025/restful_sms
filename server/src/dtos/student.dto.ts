import { Gender, Level } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsInt,
  IsIn,
  Min,
  Max,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  names: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  class?: string;

  @IsOptional()
  @IsIn(['LEVEL_1', 'LEVEL_2', 'LEVEL_3'])
  level?: Level;

  @IsOptional()
  @IsString()
  major?: string;

  @IsIn(['MALE', 'FEMALE'])
  gender: Gender;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsIn(['LEVEL_1', 'LEVEL_2', 'LEVEL_3'])
  level?: Level;

  @IsOptional()
  @IsString()
  major?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  score?: number;
}
