import { RegisterUserCommandInputModel, RegisterUserCommandResultModel } from 'src/domain/models';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';
export declare class RegisterUserCommand implements BaseCommand<RegisterUserCommandInputModel, RegisterUserCommandResultModel> {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(input: RegisterUserCommandInputModel): Promise<RegisterUserCommandResultModel>;
    private isGenderInvalid;
}
