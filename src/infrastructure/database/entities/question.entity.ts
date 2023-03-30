import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'question' })
export class QuestionEntity extends BaseEntity {
  constructor(partial: Partial<QuestionEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'keywords', type: String, array: true })
  keywords: string[];

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'view_number', default: 0 })
  viewNumber: number;

  @Column({ name: 'book_mark_number', default: 0 })
  bookMarkNumber: number;

  @Column({ name: 'comment_number', default: 0 })
  commentNumber: number;

  @Column({ name: 'answer_number' })
  answerNumber: number;

  @Column({ name: 'is_trending' })
  isTrending: boolean;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'author_user_id', referencedColumnName: 'id' })
  author: UserEntity;
}
