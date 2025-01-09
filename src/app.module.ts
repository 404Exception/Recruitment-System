import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Your PostgreSQL host
      port: 5432, // Default PostgreSQL port
      username: 'postgres', // Database username
      password: '123', // Database password
      database: 'RecruitmentAgency', // Name of your PostgreSQL database
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entities
      synchronize: false, // Should only be used in development (creates tables automatically)
    }),
    AuthModule,
    UserModule,
    CandidateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
