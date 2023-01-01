import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities";

export class UserRepository {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {
    }

    async findAll() {
        return await this.usersRepository.find();
    }

    async create(user: UserEntity) {
        await this.usersRepository.save(user);
    }
}