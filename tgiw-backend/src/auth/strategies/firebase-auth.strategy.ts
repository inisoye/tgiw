import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  private firebaseApp = this.authService.firebaseApp;

  async validate(token: string) {
    try {
      const firebaseUser = await this.firebaseApp
        .auth()
        .verifyIdToken(token, true);

      if (!firebaseUser) {
        throw new UnauthorizedException();
      }

      return firebaseUser;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
