import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

class LoginUserDto extends OmitType(CreateUserDto, ['age']) {}

export default LoginUserDto;
