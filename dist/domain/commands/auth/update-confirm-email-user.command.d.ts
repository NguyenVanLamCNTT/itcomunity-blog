import { UpdateConfirmEmailUserInputModel, UpdateConfirmEmailUserResultModel } from 'src/domain/models';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';
export declare class UpdateConfirmEmailUserCommand implements BaseCommand<UpdateConfirmEmailUserInputModel, UpdateConfirmEmailUserResultModel> {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(input: UpdateConfirmEmailUserInputModel): Promise<UpdateConfirmEmailUserResultModel>;
}
