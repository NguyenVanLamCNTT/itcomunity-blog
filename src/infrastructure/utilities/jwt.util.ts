import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtUtil {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.expiresInAccessToken'),
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.expiresInRefreshToken'),
    });
  }

  generateTokenRemember(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async generatePassword(plainPassword: string) {
    const saltOrRounds = 10;
    const password = await bcrypt.hash(plainPassword, saltOrRounds);

    return password;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('jwt.secret'),
      });
      return payload;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
