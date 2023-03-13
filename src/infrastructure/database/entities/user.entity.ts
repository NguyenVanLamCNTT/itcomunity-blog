import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { SeriesEntity } from './series.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'last_login', type: 'timestamp' })
  lastLogin: Date;

  @Column({ name: 'followers_number' })
  followersNumber: number;

  @Column({ name: 'posts_number' })
  postsNumber: number;

  @Column({ name: 'likes_number' })
  likesNumber: number;

  @Column({ name: 'is_confirm_email' })
  isConfirmEmail: boolean;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @Column({ name: 'avatar' })
  avatar: string;

  @Column({ name: 'about' })
  about: string;

  @OneToMany(() => SeriesEntity, (series) => series.author)
  series: SeriesEntity[];
}
