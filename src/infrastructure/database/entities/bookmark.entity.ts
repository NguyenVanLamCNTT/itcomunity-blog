import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SeriesEntity } from './series.entity';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'bookmark' })
export class BookmarkEntity extends BaseEntity {
  @ManyToOne(() => SeriesEntity, { eager: true })
  @JoinColumn({ name: 'series_id', referencedColumnName: 'id' })
  series: SeriesEntity;
  @ManyToOne(() => PostEntity, { eager: true })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  constructor(partial: Partial<BookmarkEntity>) {
    super();
    Object.assign(this, partial);
  }
}
