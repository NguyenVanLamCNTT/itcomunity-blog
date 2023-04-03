import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities';
import { paginate } from 'nestjs-typeorm-paginate';

export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async save(comment: CommentEntity) {
    return await this.commentRepository.save(comment);
  }

  async findById(id: number) {
    return await this.commentRepository.findOne({ where: { id } });
  }
  async findByPostId(postId: number, page: number, perPage: number) {
    return await paginate<CommentEntity>(
      this.commentRepository,
      { page, limit: perPage },
      {
        where: {
          post: { id: postId },
          parentComment: null,
        },
        relations: ['childComment'],
        order: { created: 'DESC' },
      },
    );
  }

  async findBySeriesId(seriesId: number, page: number, perPage: number) {
    return await paginate<CommentEntity>(
      this.commentRepository,
      { page, limit: perPage },
      {
        where: {
          series: { id: seriesId },
          parentComment: null,
        },
        relations: ['childComment'],
        order: { created: 'DESC' },
      },
    );
  }
}
