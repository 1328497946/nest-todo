import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMagneticChainDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty({ message: '磁力链不能为空' })
  link: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tag: string[];

  @IsString()
  @IsNotEmpty({ message: 'HASH值不能为空' })
  hash: string;

  @IsNotEmpty({ message: '创建者不能为空' })
  @IsUUID()
  user_id: string;
}
