import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: 'JWT_SECRET_KEY_FOR_RECRUITMENT_AGENCIES',
          signOptions: { expiresIn: '1h' },
        }),
        UserModule
      ],
  providers: [AuthService,JwtStrategy,],
  controllers: [AuthController]
})
export class AuthModule {}
