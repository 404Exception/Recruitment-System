import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { candidates } from 'src/Entities/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([candidates])],
  providers: [CandidateService],
  controllers: [CandidateController]
})
export class CandidateModule {}
