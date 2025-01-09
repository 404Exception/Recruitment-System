import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateCandidateDto } from 'src/dtos/candidates.dto';
import { CandidateService } from './candidate.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('candidate')
export class CandidateController {
    constructor(private readonly candidateService: CandidateService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create-candidate')
    @ApiOperation({ summary: 'Create a new candidate' }) // Description of the route
    @ApiResponse({ status: 201, description: 'The candidate has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorize error' })
    @ApiResponse({ status: 300, description: 'Email address is already exist' })
    async createCandidate(@Body() candidateDto: CreateCandidateDto) {
        this.candidateService.createCandidate(candidateDto);
    }
}
