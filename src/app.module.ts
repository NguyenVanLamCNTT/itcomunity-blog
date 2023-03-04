import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './presentation/configurations/configuration';
import {
  AuthModule,
  DMSModule,
  PostModule,
  TopicModule,
  UserModule,
} from './presentation/modules';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
