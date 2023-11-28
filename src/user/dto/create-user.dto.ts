import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6, { message: '用户名不能少于6个字符' })
  @MaxLength(18, { message: '用户名不能多于18个字符' })
  name: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @MinLength(6, { message: '密码不能少于6个字符' })
  @MaxLength(18, { message: '密码不能多于18个字符' })
  password: string;
}
