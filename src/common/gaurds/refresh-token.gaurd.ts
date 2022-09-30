import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN } from '../strategy.types';

export class RefreshTokenGaurd extends AuthGuard(REFRESH_TOKEN) {
  constructor() {
    super();
  }
}
