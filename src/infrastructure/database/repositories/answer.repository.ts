import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from '../entities';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';

export class AnswerRepository {
  constructor(
    @InjectRepository(AnswerEntity)
    private repository: Repository<AnswerEntity>,
  ) {}

  async save(answer: AnswerEntity) {
    return await this.repository.save(answer);
  }

  async findAll(
    page: number,
    perPage: number,
    sort: string,
    questionId: number,
  ) {
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
    return await paginate<AnswerEntity>(
      this.repository,
      {
        page,
        limit: perPage,
      },
      {
        where: {
          isDeleted: false,
          question: { id: questionId },
        },
        relations: ['author'],
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async findById(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ['author', 'question'],
    });
  }
}
