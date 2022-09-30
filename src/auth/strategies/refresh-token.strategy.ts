import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { REFRESH_TOKEN } from 'src/common/strategy.types';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.headers['authorization']
      .replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
  }
}
