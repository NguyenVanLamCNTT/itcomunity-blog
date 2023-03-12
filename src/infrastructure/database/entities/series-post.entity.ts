import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { SeriesEntity } from './series.entity';

@Entity({ name: 'series_posts' })
export class SeriesPostEntity extends BaseEntity {
  @ManyToOne(() => SeriesEntity, { eager: true })
  @JoinColumn({ name: 'series_id', referencedColumnName: 'id' })
  series: SeriesEntity;
  @ManyToOne(() => PostEntity, { eager: true })
  @JoinColumn({ name: 'posts_id', referencedColumnName: 'id' })
  post: PostEntity;

  constructor(partial: Partial<SeriesPostEntity>) {
    super();
    Object.assign(this, partial);
  }
}
