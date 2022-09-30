import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN } from 'src/common/strategy.types';

export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN,
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
