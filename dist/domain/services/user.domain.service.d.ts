import { RegisterUserCommand, UpdateConfirmEmailUserCommand } from '../commands';
import { RegisterUserCommandInputModel } from '../models';
import { UserQuery } from '../queries';
export declare class UserDomainService {
    private userQuery;
    private registerUserCommand;
    private updateConfirmEmailUserCommand;
    constructor(userQuery: UserQuery, registerUserCommand: RegisterUserCommand, updateConfirmEmailUserCommand: UpdateConfirmEmailUserCommand);
    getAllUser(): Promise<import("../../infrastructure/database/entities").UserEntity[]>;
    createUser(registerUserCommandInputModel: RegisterUserCommandInputModel): Promise<boolean>;
    getUserByEmailOrUsername(textSearch: string): Promise<import("../../infrastructure/database/entities").UserEntity>;
    confirmEmailUser(email: string): Promise<boolean>;
}
