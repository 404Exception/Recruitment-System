// src/users/dto/create-user.dto.ts

import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsOptional,
    MinLength,
    IsNumber,
    IsInt,
    MaxLength,
    isNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCandidateDto {
    @ApiPropertyOptional({ description: 'The user ID (optional)' })
    @IsOptional()
    @IsInt()
    user_id?: number;
    
    @ApiProperty({ description: 'The contact number of the candidate', example: '9876543210' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(12, { message: 'Contact number can only have 10 characters.' })
    contactnumber: string;

    @ApiProperty({ description: 'The email of the candidate', example: 'john@example.com' })
    @IsEmail({}, { message: 'Invalid email format.' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The first name of the candidate', example: 'John' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ description: 'The last name of the candidate', example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ description: 'Work experience of candidate in year(s)', example: '5' })
    @IsNumber()
    @IsNotEmpty()
    workexpyr: number;
}
