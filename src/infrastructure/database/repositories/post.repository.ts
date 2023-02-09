import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities';

export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async save(post: PostEntity) {
    await this.postRepository.save(post);
  }

  async findById(id: number) {
    return await this.postRepository.findOne({ where: { id } });
  }
}
