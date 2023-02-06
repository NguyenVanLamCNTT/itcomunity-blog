"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const commands_1 = require("../../../domain/commands");
const queries_1 = require("../../../domain/queries");
const services_1 = require("../../../domain/services");
const entities_1 = require("../../../infrastructure/database/entities");
const repositories_1 = require("../../../infrastructure/database/repositories");
const jwt_util_1 = require("../../../infrastructure/utilities/jwt.util");
const configuration_1 = require("../../configurations/configuration");
const request_correlation_1 = require("../../../utility/request-correlation");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const cache_1 = require("@nestjs/common/cache");
const redisStore = require("cache-manager-redis-store");
const constants_1 = require("../../../domain/constants");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.UserEntity]),
            passport_1.PassportModule,
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => {
                    return {
                        secret: config.get('jwt.secret'),
                    };
                },
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule.forRoot({ load: [configuration_1.default] })],
                useFactory: async (config) => ({
                    transport: {
                        host: config.get('email.host'),
                        secure: false,
                        auth: {
                            user: config.get('email.user'),
                            pass: config.get('email.password'),
                        },
                    },
                    defaults: {
                        from: config.get('email.from'),
                    },
                    template: {
                        dir: constants_1.SendEmailConstants.NAME_FOLDER_TEMPLATE,
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            cache_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    store: redisStore,
                    host: config.get('redis.host'),
                    port: config.get('redis.port'),
                    password: config.get('redis.password'),
                    isGlobal: true,
                    database: 0,
                    ttl: 120,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            repositories_1.UserRepository,
            queries_1.UserQuery,
            commands_1.RegisterUserCommand,
            commands_1.UpdateConfirmEmailUserCommand,
            services_1.UserDomainService,
            auth_service_1.AuthService,
            jwt_util_1.JwtUtil,
            request_correlation_1.RequestCorrelation,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map