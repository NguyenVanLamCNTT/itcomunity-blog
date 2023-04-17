import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from 'src/infrastructure/utilities';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtUtil: JwtUtil) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = await this.jwtUtil.verifyToken(token);
      console.log(payload);
      (req as any).user = payload;
    }
    next();
  }
}
