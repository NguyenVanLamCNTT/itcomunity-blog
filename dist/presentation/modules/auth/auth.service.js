"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../../domain/exceptions");
const services_1 = require("../../../domain/services");
const utilities_1 = require("../../../infrastructure/utilities");
const models_1 = require("../../models");
const utility_1 = require("../../../utility");
const bcrypt = require("bcrypt");
const dist_1 = require("@nestjs-modules/mailer/dist");
const constants_1 = require("../../../domain/constants");
let AuthService = class AuthService {
    constructor(jwtUtil, userDomainService, mailerService, cacheManager) {
        this.jwtUtil = jwtUtil;
        this.userDomainService = userDomainService;
        this.mailerService = mailerService;
        this.cacheManager = cacheManager;
    }
    async register(request) {
        const password = await this.jwtUtil.generatePassword(request.password);
        const result = await this.userDomainService.createUser({
            age: request.age,
            email: request.email,
            fullName: request.fullName,
            gender: request.gender,
            password: password,
            username: request.username,
        });
        return new models_1.RegisterUserResponseModel({
            id: utility_1.RequestCorrelation.getRequestId(),
            data: { success: result },
        });
    }
    async login(request) {
        const user = await this.userDomainService.getUserByEmailOrUsername(request.username);
        if (!user) {
            throw new exceptions_1.UserNotExistException();
        }
        const isMatch = await bcrypt.compare(request.password, user.password);
        if (!isMatch) {
            throw new exceptions_1.IncorrectPassword();
        }
        let accessToken = this.jwtUtil.generateAccessToken({ userId: user.id });
        let refreshToken = this.jwtUtil.generateRefreshToken({ userId: user.id });
        if (request.remember) {
            accessToken = refreshToken = this.jwtUtil.generateTokenRemember({
                userId: user.id,
            });
        }
        return new models_1.LoginUserResponseModel({
            id: utility_1.RequestCorrelation.getRequestId(),
            data: {
                accessToken,
                refreshToken,
                isConfirmEmail: user.isConfirmEmail,
                isAdmin: user.isAdmin,
                lastLogin: user.lastLogin,
            },
        });
    }
    async sendOTPComfirm(request) {
        const otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        const res = await this.mailerService.sendMail({
            to: request.email,
            subject: constants_1.SendEmailConstants.SUBJECT_SEND_OTP,
            template: constants_1.SendEmailConstants.NAME_FILE_TEMPLATE,
            context: {
                name: request.fullname,
                otp: otp,
            },
        });
        await this.cacheManager.set(request.email, otp);
        return new models_1.ConfirmOTPResponseModel({
            id: utility_1.RequestCorrelation.getRequestId(),
            data: { success: true },
        });
    }
    async validateOTP(request) {
        const otp = await this.cacheManager.get(request.email);
        if (!otp || otp !== request.otp) {
            throw new exceptions_1.OTPInvalidException();
        }
        await this.userDomainService.confirmEmailUser(request.email);
        return new models_1.ValidateOTPResponseModel({
            id: utility_1.RequestCorrelation.getRequestId(),
            data: {
                success: true,
            },
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [utilities_1.JwtUtil,
        services_1.UserDomainService,
        dist_1.MailerService, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map