import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'topic' })
export class TopicEntity extends BaseEntity {
  constructor(partial: Partial<TopicEntity>) {
    super();
    Object.assign(this, partial);
  }
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'followers_number' })
  followersNumber: number;
  @Column({ name: 'answer_number' })
  answerNumber: number;
  @Column({ name: 'post_number' })
  postNumber: number;
  @Column({ name: 'is_trending' })
  isTrending: boolean;
  @Column({ name: 'image' })
  image: string;
}
