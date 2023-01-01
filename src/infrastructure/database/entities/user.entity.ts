import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({name: 'user'})
export class UserEntity extends BaseEntity{
  
    @Column({name: 'full_name'})
    fullName: string;

    @Column({name: 'username'})
    username: string;

    @Column({name: 'password'})
    password: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'age'})
    age: number;

    @Column({name: 'gender'})
    gender: string;
}