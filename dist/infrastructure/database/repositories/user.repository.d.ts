import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
export declare class UserRepository {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    save(user: UserEntity): Promise<void>;
    findByEmail(email: string): Promise<UserEntity>;
    findByEmailOrUsername(textSearch: string): Promise<UserEntity>;
}
