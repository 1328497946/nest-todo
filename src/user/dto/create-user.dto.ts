import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Role } from '../interface';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: '用户名不能少于5个字符' })
  @MaxLength(18, { message: '用户名不能多于18个字符' })
  name: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: '密码不能少于6个字符' })
  @MaxLength(18, { message: '密码不能多于18个字符' })
  password: string;

  @IsOptional()
  @IsString()
  @IsEnum(Role)
  role: string;
}
