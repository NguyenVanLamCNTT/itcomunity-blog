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
  async findAll(
    page: number,
    perPage: number,
    postId: number,
    seriesId: number,
    answerId: number,
  ) {
    let option = {};
    if (postId) {
      option = {
        ...option,
        post: { id: postId },
      };
    }
    if (seriesId) {
      option = {
        ...option,
        series: { id: seriesId },
      };
    }
    if (answerId) {
      option = {
        ...option,
        answer: { id: answerId },
      };
    }
    return await paginate<CommentEntity>(
      this.commentRepository,
      { page, limit: perPage },
      {
        where: {
          ...option,
          parentComment: null,
          isDeleted: false,
        },
        relations: ['childComment'],
        order: { created: 'DESC' },
      },
    );
  }
}
