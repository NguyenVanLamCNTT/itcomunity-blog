import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'answer' })
export class AnswerEntity extends BaseEntity {
  constructor(partial: Partial<AnswerEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'content' })
  content: string;
  @Column({ name: 'is_approved' })
  isApproved: boolean;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'author_user_id', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => QuestionEntity)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: QuestionEntity;
}
