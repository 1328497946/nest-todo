import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { MagneticChainService } from './magnetic-chain.service';
import { CreateMagneticChainDto } from './dto/create-magnetic-chain.dto';
import { UpdateMagneticChainDto } from './dto/update-magnetic-chain.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AbilityFactory, ForbiddenError } from 'src/ability/ability.factory';
import { GUser } from 'src/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Action } from 'src/ability/interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MagneticChain } from './entities/magnetic-chain.entity';
import { Repository } from 'typeorm';
@Controller('magnetic-chain')
export class MagneticChainController {
  constructor(
    @InjectRepository(MagneticChain)
    private readonly magneticChainRepository: Repository<MagneticChain>,
    private readonly abilityFactory: AbilityFactory,
    private readonly magneticChainService: MagneticChainService,
  ) {}

  @Post()
  create(
    @Body() createMagneticChainDto: CreateMagneticChainDto,
    @GUser() user: User,
  ) {
    return this.magneticChainService.create(createMagneticChainDto, user);
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
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() updateMagneticChainDto: UpdateMagneticChainDto,
  ) {
    const targetMagneticChain = await this.magneticChainRepository.findOne({
      where: {
        id,
      },
    });
    if (!targetMagneticChain) {
      throw new BadRequestException('该磁力链不存在');
    }
    return this.magneticChainService.update(
      targetMagneticChain,
      updateMagneticChainDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id, @GUser() user: User) {
    const ability = this.abilityFactory.defineAbility(user);
    ForbiddenError.from(ability).throwUnlessCan(Action.Delete, user);
    const targetMagneticChain = await this.magneticChainRepository.findOne({
      where: {
        id,
      },
    });
    if (!targetMagneticChain) {
      throw new BadRequestException('该磁力链不存在');
    }
    return this.magneticChainService.remove(targetMagneticChain);
  }
}
