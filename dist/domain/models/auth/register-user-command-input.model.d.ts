import { Gender } from 'src/domain/enums';
export declare class RegisterUserCommandInputModel {
    username: string;
    fullName: string;
    password: string;
    email: string;
    age: number;
    gender: Gender;
    constructor(partial: Partial<RegisterUserCommandInputModel>);
}
