import { InjectRepository } from '@nestjs/typeorm';
import { AuthorFollowersEntity } from '../entities';
import { Repository } from 'typeorm';

export class AuthorFollowerRepository {
  constructor(
    @InjectRepository(AuthorFollowersEntity)
    private repository: Repository<AuthorFollowersEntity>,
  ) {}

  async save(entity: AuthorFollowersEntity) {
    return await this.repository.save(entity);
  }

  async findByFollowerId(followerUserId: number) {
    return await this.repository.find({
      where: {
        follower: {
          id: followerUserId,
        },
      },
    });
  }

  async findByAuthorIdFollowerId(authorId: number, followerId: number) {
    return await this.repository.findOne({
      where: {
        follower: {
          id: followerId,
        },
        author: {
          id: authorId,
        },
      },
    });
  }

  async remove(entity: AuthorFollowersEntity) {
    await this.repository.remove(entity);
  }

  async findByAuthorId(authorId: number) {
    return await this.repository.find({ where: { author: { id: authorId } } });
  }
}
