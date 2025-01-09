import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from 'src/dtos/candidates.dto';
import { candidates } from 'src/Entities/candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateService {
    constructor(
        @InjectRepository(candidates)
        private candidateRepository: Repository<candidates>
    ) { }

    // Find a candidate by email from the database.
    async getCandidateByEmail(email: string): Promise<candidates | undefined> {
        return this.candidateRepository.findOne({ where: { email } });
    }

    // Create candidate.
    async createCandidate(candidateDto: CreateCandidateDto): Promise<candidates> {
        var result = this.getCandidateByEmail(candidateDto.email);
        if (result != null) {
            throw new HttpException('Email address already exist !', HttpStatus.AMBIGUOUS);
        }
        const user = this.candidateRepository.create(candidateDto);
        return this.candidateRepository.save(user);
    }

}
