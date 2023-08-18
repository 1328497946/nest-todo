import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  password: string;
}
