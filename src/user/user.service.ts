import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
    ) { }

    // Find a user by username from the database
    async findByEmail(email: string): Promise<Users | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    // Create a new user and store in the database
  async createUser(username: string, password: string): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      first_name: 'adam',
      last_name: 'test',
      email: username,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
