import { Injectable } from "@nestjs/common";
import { RegisterUserCommandInputModel, RegisterUserCommandResultModel } from "src/domain/models";
import { UserEntity } from "src/infrastructure/database/entities";
import { UserRepository } from "src/infrastructure/database/repositories";
import { BaseCommand } from "../base-command";

@Injectable({})
export class RegisterUserCommand implements BaseCommand<RegisterUserCommandInputModel, RegisterUserCommandResultModel> {
    constructor(private userRepository: UserRepository){}
    async execute(input: RegisterUserCommandInputModel): Promise<RegisterUserCommandResultModel> {
        const entity = new UserEntity(input);
        await this.userRepository.create(entity);

        return new RegisterUserCommandResultModel({success: true});
    }
    
}