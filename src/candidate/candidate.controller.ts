import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateCandidateDto } from 'src/dtos/candidates.dto';
import { CandidateService } from './candidate.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { candidates } from 'src/Entities/candidate.entity';
import { query } from 'express';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Controller('candidate')
@UseGuards(AuthGuard('jwt'))
export class CandidateController {
    constructor(private readonly candidateService: CandidateService) { }

    @Post('create-candidate')
    @ApiOperation({ summary: 'Create a new candidate' }) // Description of the route
    @ApiResponse({ status: 201, description: 'The candidate has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorize error' })
    @ApiResponse({ status: 300, description: 'Email address is already exist' })
    async createCandidate(@Body() candidateDto: CreateCandidateDto) {
        return this.candidateService.createCandidate(candidateDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update candidate' })
    @ApiResponse({ status: 201, description: 'The candidate has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorize error' })
    async updateCandidate(
        @Param('id') id: number,
        @Body() data: Partial<candidates>,
    ): Promise<candidates> {
        return this.candidateService.updateCandidate(id, data);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get candidate by id.' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorize error.' })
    async getCandidate(@Param('id') id: number): Promise<candidates> {
        return this.candidateService.findCandidateById(id);
    }

    // @Get()
    // @ApiOperation({ summary: 'Get all candidates.' })
    // @ApiResponse({ status: 200, description: 'Success.' })
    // @ApiResponse({ status: 400, description: 'Bad Request.' })
    // @ApiResponse({ status: 401, description: 'Unauthorize error.' })
    // async getAllCandidates(@Query() paginationDto: PaginationDto): Promise<candidates[]> {
    //     const { page, limit } = paginationDto;
    //     return this.candidateService.getAllCandidates();
    // }

    @Get()
    @ApiOperation({ summary: 'Get all candidates.' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorize error.' })
    async getAll(@Query() paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        return await this.candidateService.findAll(page, limit);
    }
}
