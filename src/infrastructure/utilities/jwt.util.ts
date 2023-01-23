import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtUtil {
    constructor(private jwtService: JwtService, private configService: ConfigService){}

    generateAccessToken(payload: any): string {

        return this.jwtService.sign(payload, {expiresIn: this.configService.get('jwt.expiresInAccessToken')});
    }

    generateRefreshToken(payload: any): string {
        return this.jwtService.sign(payload, {expiresIn: this.configService.get('jwt.expiresInRefreshToken')});
    }

    async generatePassword(plainPassword: string) {
        const saltOrRounds = 10;
        const password = await bcrypt.hash(plainPassword, saltOrRounds);

        return password;
    }
}