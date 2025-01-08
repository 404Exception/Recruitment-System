import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
      const user = await this.authService.validateUser(body.email, body.password);
      return this.authService.login(user);
    }

    // Endpoint for registering new users
  @Post('register')
  async register(@Body() registerDto: { email: string, password: string }) {
    return this.authService.createUser(registerDto);
  }

}
