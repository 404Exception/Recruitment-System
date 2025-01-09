// src/users/dto/create-user.dto.ts

import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsOptional,
    MinLength,
    IsNumber,
    IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiPropertyOptional({ description: 'The user ID (optional)' })
    @IsOptional()
    @IsInt()
    user_id?: number;
    
    @ApiProperty({ description: 'The password of the user', example: 'password123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    password: string;

    @ApiProperty({ description: 'The email of the user', example: 'john@example.com' })
    @IsEmail({}, { message: 'Invalid email format.' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The first name of the user', example: 'John' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    last_name: string;
}
