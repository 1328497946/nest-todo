import { IsString } from 'class-validator';

class LoginUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}

export default LoginUserDto;
