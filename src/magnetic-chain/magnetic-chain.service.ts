import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMagneticChainDto } from './dto/create-magnetic-chain.dto';
import { UpdateMagneticChainDto } from './dto/update-magnetic-chain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagneticChain } from './entities/magnetic-chain.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MagneticChainService {
  constructor(
    @InjectRepository(MagneticChain)
    private readonly magneticChainRepository: Repository<MagneticChain>,
  ) {}
  async create(createMagneticChainDto: CreateMagneticChainDto) {
    const existsMagneticChain = await this.magneticChainRepository.findOne({
      where: { link: createMagneticChainDto.link },
    });
    if (existsMagneticChain) {
      throw new ConflictException('磁力链已存在');
    }
    const { tag = [], ...rest } = createMagneticChainDto;
    const newMagneticChain = await this.magneticChainRepository.create({
      ...rest,
      tag: tag.join(','),
    });
    await this.magneticChainRepository.save(newMagneticChain);
    return '磁力链添加成功';
  }

  findAll() {
    return `This action returns all magneticChain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} magneticChain`;
  }

  update(id: number, updateMagneticChainDto: UpdateMagneticChainDto) {
    updateMagneticChainDto;
    return `This action updates a #${id} magneticChain`;
  }

  remove(id: number) {
    return `This action removes a #${id} magneticChain`;
  }
}
