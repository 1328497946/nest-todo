import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MagneticChainService } from './magnetic-chain.service';
import { CreateMagneticChainDto } from './dto/create-magnetic-chain.dto';
import { UpdateMagneticChainDto } from './dto/update-magnetic-chain.dto';

@Controller('magnetic-chain')
export class MagneticChainController {
  constructor(private readonly magneticChainService: MagneticChainService) {}

  @Post()
  create(@Body() createMagneticChainDto: CreateMagneticChainDto) {
    return this.magneticChainService.create(createMagneticChainDto);
  }

  @Get()
  findAll() {
    return this.magneticChainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.magneticChainService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMagneticChainDto: UpdateMagneticChainDto,
  ) {
    return this.magneticChainService.update(+id, updateMagneticChainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.magneticChainService.remove(+id);
  }
}
