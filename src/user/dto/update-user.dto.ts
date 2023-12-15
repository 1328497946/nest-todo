import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * extends PartialType(CreateUserDto)不起效果
 * https://stackoverflow.com/questions/64376439/nestjs-dto-extended-with-partialtype-breaks-validation#
 */

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(5, { message: '用户名不能少于5个字符' })
  @MaxLength(18, { message: '用户名不能多于18个字符' })
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: '密码不能少于6个字符' })
  @MaxLength(18, { message: '密码不能多于18个字符' })
  password: string;

  @IsOptional()
  @IsString()
  access_token: string;

  @IsOptional()
  @IsString()
  refresh_token: string;
}
