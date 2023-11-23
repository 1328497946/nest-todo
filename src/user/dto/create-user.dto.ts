import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  password: string;
}
