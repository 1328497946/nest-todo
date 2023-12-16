import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateMagneticChainDto } from './dto/create-magnetic-chain.dto';
import { UpdateMagneticChainDto } from './dto/update-magnetic-chain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagneticChain } from './entities/magnetic-chain.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

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
    await this.magneticChainRepository.save(createMagneticChainDto);
    return '磁力链添加成功';
  }

  // TODO 分页
  async findAll(query: PaginateQuery): Promise<Paginated<MagneticChain>> {
    return await paginate(query, this.magneticChainRepository, {
      sortableColumns: ['id', 'name', 'create_date'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'link', 'tag'],
      select: ['*'],
      defaultLimit: 10,
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        link: true,
      },
    });
  }

  async findOne(id: number) {
    const findMagneticChain = this.magneticChainRepository.findOne({
      where: {
        id,
      },
    });
    if (!findMagneticChain) {
      throw new BadRequestException('查询的磁力链不存在');
    }
    return findMagneticChain;
  }

  async update(id: number, updateMagneticChainDto: UpdateMagneticChainDto) {
    updateMagneticChainDto;
    const targetMagneticChain = await this.magneticChainRepository.findOne({
      where: {
        id,
      },
    });
    if (!targetMagneticChain) {
      throw new BadRequestException('该磁力链不存在');
    }
    await this.magneticChainRepository.merge(
      targetMagneticChain,
      updateMagneticChainDto,
    );
    await this.magneticChainRepository.save(targetMagneticChain);
    return '磁力链信息更改成功';
  }

  remove(id: number) {
    return `This action removes a #${id} magneticChain`;
  }
}
