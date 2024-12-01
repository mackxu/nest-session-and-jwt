import {
  Controller,
  Get,
  Headers,
  Inject,
  Res,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Get('jwt')
  token(
    @Res({ passthrough: true }) resp: Response,
    @Headers('authorization') authorization: string,
  ) {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const payload = this.jwtService.verify(token);
        console.log(payload, 123);
        const newPayload = {
          count: payload.count + 1,
        };
        const newToken = this.jwtService.sign(newPayload);
        resp.setHeader('token', newToken);
        return newPayload;
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException('token 过期');
      }
    }
    const payload = { username: 'duoduoxu', count: 1 };
    const token = this.jwtService.sign(payload);
    resp.setHeader('token', token);
    return {
      code: 200,
      msg: 'success',
    };
  }

  @Get('sess')
  sess(@Session() session: any) {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;

    return session.count;
  }
}
