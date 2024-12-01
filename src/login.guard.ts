import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authorization = req.headers.authorization || '';
    const bearer = authorization.split(' ');
    if (bearer.length !== 2) {
      throw new UnauthorizedException('token 错误');
    }
    const token = bearer[1];

    try {
      const payload = this.jwtService.verify(token);
      (req as any).count = payload.count;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('token 无效');
    }
  }
}
