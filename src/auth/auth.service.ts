import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/dtos/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async createUser(user: RegisterUserDto) {
        const result = await this.userService.findByEmail(user.email);
        if(result != null)
        {
            throw new HttpException('Email address already exist!', HttpStatus.AMBIGUOUS);
        }
        return this.userService.createUser(user)
    }
}
