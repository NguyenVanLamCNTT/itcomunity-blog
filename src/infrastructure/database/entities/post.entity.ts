import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TopicPostEntity } from './topic-post.entity';

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity {
  constructor(partial: Partial<PostEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'keywords', type: 'varchar', array: true })
  keywords: string[];

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'view_number', default: 0 })
  viewNumber: number;

  @Column({ name: 'book_mark_number', default: 0 })
  bookMarkNumber: number;

  @Column({ name: 'comment_number', default: 0 })
  commentNumber: number;

  @Column({ name: 'image_thumbnail' })
  imageThumbnail: string;

  @Column({ name: 'is_trending' })
  isTrending: boolean;

  @Column({ name: 'status' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: true })
  @JoinColumn({ name: 'author_user_id', referencedColumnName: 'id' })
  author: UserEntity;

  @OneToMany(() => TopicPostEntity, (topicPost) => topicPost.post)
  topicPost: TopicPostEntity[];
}
