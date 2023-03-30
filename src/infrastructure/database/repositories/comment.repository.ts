import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities';

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
}
