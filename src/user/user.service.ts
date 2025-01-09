import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/dtos/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
    ) { }

    // Find a user by email from the database
    async findByEmail(email: string): Promise<Users | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    // Create a new user and store in the database
    async createUser(registerDto: RegisterUserDto): Promise<Users> {
        registerDto.password = await bcrypt.hash(registerDto.password, 10);
        const user = this.userRepository.create(registerDto);
        return this.userRepository.save(user);
    }
}
