import {Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

export class BaseEntity{
  @PrimaryGeneratedColumn('identity', { name: 'id', generatedIdentity: 'BY DEFAULT' })
  id!: number;

  @CreateDateColumn({nullable: true})
  created: Date;

  @CreateDateColumn({nullable: true})
  modified: Date;

  @Column({name: 'is_deleted'})
  isDeleted: boolean;
}