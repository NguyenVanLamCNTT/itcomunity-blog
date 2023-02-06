import { UserDomainService } from 'src/domain/services';
export declare class UserService {
    private userDomainService;
    constructor(userDomainService: UserDomainService);
    getAllUser(): Promise<import("../../../infrastructure/database/entities").UserEntity[]>;
}
