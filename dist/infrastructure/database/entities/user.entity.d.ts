import { BaseEntity } from './base.entity';
export declare class UserEntity extends BaseEntity {
    constructor(partial: Partial<UserEntity>);
    fullName: string;
    username: string;
    password: string;
    email: string;
    age: number;
    gender: string;
    lastLogin: Date;
    followersNumber: number;
    postsNumber: number;
    likesNumber: number;
    isConfirmEmail: boolean;
    isAdmin: boolean;
}
