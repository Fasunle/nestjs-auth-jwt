import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}