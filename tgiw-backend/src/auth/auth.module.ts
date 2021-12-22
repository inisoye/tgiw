import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import { Song } from '../songs/entities/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Song]),
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
