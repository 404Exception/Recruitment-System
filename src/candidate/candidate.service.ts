import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from 'src/dtos/candidates.dto';
import { candidates } from 'src/Entities/candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class CandidateService {
    constructor(
        @InjectRepository(candidates) private candidateRepository: Repository<candidates>
    ) { }

    // Find a candidate by email from the database.
    async getCandidateByEmail(email: string): Promise<candidates | undefined> {
        return this.candidateRepository.findOne({ where: { email } });
    }

    // Create candidate.
    async createCandidate(candidateDto: CreateCandidateDto) {
        var result = await this.getCandidateByEmail(candidateDto.email);
        if (result != null) {
            throw new HttpException('Email address already exist !', HttpStatus.AMBIGUOUS);
        }
        const user = this.candidateRepository.create(candidateDto);
        return this.candidateRepository.save(user);
    }

    //Get candidate by id
    async findCandidateById(user_id: number): Promise<candidates> {
        return this.candidateRepository.findOneBy({ user_id });
    }

    //update candidate
    async updateCandidate(user_id: number, data: Partial<candidates>): Promise<candidates> {
        await this.candidateRepository.update(user_id, data);
        return this.candidateRepository.findOneBy({ user_id });
    }

    async findAll(page: number, limit: number): Promise<{ data: candidates[], total: number }> {
        const [data, total] = await this.candidateRepository.findAndCount({
          take: limit, // Number of records to return
          skip: (page - 1) * limit, // Skip records based on page number
        });
    
        return {
          data,  // Data for the current page
          total, // Total records in the database
        };
      }

}
