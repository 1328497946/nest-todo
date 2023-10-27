import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  access_token?: string;
  refresh_token?: string;
}

// OmitType(CreateCatDto, ['name'] as const) {}
