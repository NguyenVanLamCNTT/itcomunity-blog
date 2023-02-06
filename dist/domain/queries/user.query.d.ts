import { UserRepository } from 'src/infrastructure/database/repositories';
export declare class UserQuery {
    private userRepository;
    constructor(userRepository: UserRepository);
    getAll(): Promise<import("../../infrastructure/database/entities").UserEntity[]>;
    getUserByEmailOrUsername(textSearch: string): Promise<import("../../infrastructure/database/entities").UserEntity>;
}
