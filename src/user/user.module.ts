import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])], // Import the User entity for repository access
    providers: [UserService],
    exports: [UserService], // Export the service to use it in other modules
})
export class UserModule { }
