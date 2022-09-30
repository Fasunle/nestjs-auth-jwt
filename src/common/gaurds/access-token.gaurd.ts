import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs/internal/Observable';
import { ACCESS_TOKEN } from '../strategy.types';

@Injectable()
export class AccessTokenGaurd
  extends AuthGuard(ACCESS_TOKEN)
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    const deactivate = this.reflector.getAllAndOverride('allowAccessToken', [
      context.getHandler(),
      context.getClass(),
    ]);

    // activate
    if (!deactivate) return super.canActivate(context);

    // deactivate
    return deactivate;
  }
}
