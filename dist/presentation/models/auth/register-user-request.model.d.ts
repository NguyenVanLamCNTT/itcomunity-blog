import { Gender } from 'src/domain/enums';
export declare class RegisterUserRequestModel {
    username: string;
    fullName: string;
    password: string;
    email: string;
    age: number;
    gender: Gender;
}
