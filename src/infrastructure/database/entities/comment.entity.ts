import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { SeriesEntity } from './series.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column({ name: 'content' })
  content: string;
  @Column({ name: 'report_number' })
  reportNumber: number;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => PostEntity, { nullable: true })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;

  @ManyToOne(() => SeriesEntity, { nullable: true })
  @JoinColumn({ name: 'series_id', referencedColumnName: 'id' })
  series: SeriesEntity;

  @ManyToOne(() => AnswerEntity, { nullable: true })
  @JoinColumn({ name: 'answer_id', referencedColumnName: 'id' })
  answer: AnswerEntity;

  @ManyToOne(() => CommentEntity)
  @JoinColumn({ name: 'parent_comment_id', referencedColumnName: 'id' })
  parentComment: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
  childComment: CommentEntity[];

  constructor(partial: Partial<CommentEntity>) {
    super();
    Object.assign(this, partial);
  }
}
