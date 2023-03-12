import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'series' })
export class SeriesEntity extends BaseEntity {
  constructor(partial: Partial<SeriesEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'keywords', type: 'text', array: true })
  keywords: string[];

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'view_number', default: 0 })
  viewNumber: number;

  @Column({ name: 'book_mark_number', default: 0 })
  bookMarkNumber: number;

  @Column({ name: 'comment_number', default: 0 })
  commentNumber: number;

  @Column({ name: 'is_trending' })
  isTrending: boolean;

  @Column({ name: 'status' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.series, { eager: true })
  @JoinColumn({ name: 'author_user_id', referencedColumnName: 'id' })
  author: UserEntity;
}
