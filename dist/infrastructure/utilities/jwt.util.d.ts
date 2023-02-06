import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class JwtUtil {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateAccessToken(payload: any): string;
    generateRefreshToken(payload: any): string;
    generateTokenRemember(payload: any): string;
    generatePassword(plainPassword: string): Promise<string>;
}
