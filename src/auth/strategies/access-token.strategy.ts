import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
