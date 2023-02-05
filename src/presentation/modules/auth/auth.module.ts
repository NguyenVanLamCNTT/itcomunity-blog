import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RegisterUserCommand,
  UpdateConfirmEmailUserCommand,
} from 'src/domain/commands';
import { UserQuery } from 'src/domain/queries';
import { UserDomainService } from 'src/domain/services';
import { UserEntity } from 'src/infrastructure/database/entities';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { JwtUtil } from 'src/infrastructure/utilities/jwt.util';
import configuration from 'src/presentation/configurations/configuration';
import { RequestCorrelation } from 'src/utility/request-correlation';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CacheModule } from '@nestjs/common/cache';
import * as redisStore from 'cache-manager-redis-store';
import { SendEmailConstants } from 'src/domain/constants';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('jwt.secret'),
        };
      },
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      useFactory: async (config: ConfigService) => ({
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
          dir: SendEmailConstants.NAME_FOLDER_TEMPLATE,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.get('redis.host'),
        port: config.get('redis.port'),
        password: config.get('redis.password'),
        isGlobal: true,
        database: 0,
        ttl: 120,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserRepository,
    UserQuery,
    RegisterUserCommand,
    UpdateConfirmEmailUserCommand,
    UserDomainService,
    AuthService,
    JwtUtil,
    RequestCorrelation,
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
