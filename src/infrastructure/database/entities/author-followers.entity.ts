import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'author_followers' })
export class AuthorFollowersEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'author_user_id', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'followers_user_id', referencedColumnName: 'id' })
  follower: UserEntity;

  constructor(partial: Partial<AuthorFollowersEntity>) {
    super();
    Object.assign(this, partial);
  }
}
