import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TopicEntity } from './topic.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'topic_user' })
export class TopicUserEntity extends BaseEntity {
  constructor(partial: Partial<TopicUserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ManyToOne(() => TopicEntity, { eager: true })
  @JoinColumn({ name: 'topic_id', referencedColumnName: 'id' })
  topic: TopicEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
