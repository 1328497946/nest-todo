import { Module } from '@nestjs/common';
import { MagneticChainService } from './magnetic-chain.service';
import { MagneticChainController } from './magnetic-chain.controller';
import { MagneticChain } from './entities/magnetic-chain.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MagneticChain])],
  controllers: [MagneticChainController],
  providers: [MagneticChainService],
})
export class MagneticChainModule {}
