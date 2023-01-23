import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserCommand } from 'src/domain/commands';
import { UserQuery } from 'src/domain/queries';
import { UserDomainService } from 'src/domain/services';
import { UserEntity } from 'src/infrastructure/database/entities';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [
        UserRepository, 
        UserQuery, 
        UserDomainService,
        UserService,
        RegisterUserCommand
    ],
    exports: [TypeOrmModule]
})
export class UserModule {}