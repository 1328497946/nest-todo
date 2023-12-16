import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MagneticChainService } from './magnetic-chain.service';
import { CreateMagneticChainDto } from './dto/create-magnetic-chain.dto';
import { UpdateMagneticChainDto } from './dto/update-magnetic-chain.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('magnetic-chain')
export class MagneticChainController {
  constructor(private readonly magneticChainService: MagneticChainService) {}

  @Post()
  create(@Body() createMagneticChainDto: CreateMagneticChainDto) {
    return this.magneticChainService.create(createMagneticChainDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.magneticChainService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.magneticChainService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body() updateMagneticChainDto: UpdateMagneticChainDto,
  ) {
    return this.magneticChainService.update(+id, updateMagneticChainDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.magneticChainService.remove(id);
  }
}
