import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// Only users who are authenticated can access a certain route
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
