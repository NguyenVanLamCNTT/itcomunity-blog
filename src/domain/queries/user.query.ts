import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class UserQuery {
    constructor(private userRepository: UserRepository){}

    async getAll() {
        return await this.userRepository.findAll();
    }
}