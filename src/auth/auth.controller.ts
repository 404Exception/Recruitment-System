import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/dtos/register.dto';

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
  @ApiOperation({ summary: 'Create a new user' }) // Description of the route
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.createUser(registerDto);
  }

}
