import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({nullable: true})
  created: Date

  @CreateDateColumn({nullable: true})
  modified: Date
}