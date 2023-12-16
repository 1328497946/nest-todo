import { Module } from '@nestjs/common';
import { MagneticChainService } from './magnetic-chain.service';
import { MagneticChainController } from './magnetic-chain.controller';
import { MagneticChain } from './entities/magnetic-chain.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([MagneticChain]), AbilityModule],
  controllers: [MagneticChainController],
  providers: [MagneticChainService],
})
export class MagneticChainModule {}
