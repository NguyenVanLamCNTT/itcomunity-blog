import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './presentation/configurations/configuration';
import {
  AuthModule,
  CommentModule,
  DMSModule,
  PostModule,
  QuestionModule,
  TopicModule,
  UserModule,
} from './presentation/modules';
import { SeriesModule } from './presentation/modules/series';
import { AuthMiddleware } from './presentation/modules/auth/auth.middleware';
import { JwtUtil } from './infrastructure/utilities';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        synchronize: false,
        entities: ['dist/infrastructure/database/entities/*.entity.{js,ts}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        logging: true,
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    //modules
    UserModule,
    AuthModule,
    PostModule,
    DMSModule,
    TopicModule,
    SeriesModule,
    CommentModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [JwtUtil, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'api/posts/:id', method: RequestMethod.GET },
        { path: 'api/series/:id', method: RequestMethod.GET },
      );
  }
}
