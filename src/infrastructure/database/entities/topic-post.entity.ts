import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { TopicEntity } from './topic.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'topic_post' })
export class TopicPostEntity extends BaseEntity {
  constructor(partial: Partial<TopicPostEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ManyToOne(() => TopicEntity, { eager: true })
  @JoinColumn({ name: 'topic_id', referencedColumnName: 'id' })
  topic: TopicEntity;

  @ManyToOne(() => PostEntity, { eager: true })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;
}
