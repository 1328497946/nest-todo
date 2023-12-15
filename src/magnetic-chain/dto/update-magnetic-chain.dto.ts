import { PartialType } from '@nestjs/swagger';
import { CreateMagneticChainDto } from './create-magnetic-chain.dto';

export class UpdateMagneticChainDto extends PartialType(
  CreateMagneticChainDto,
) {}
