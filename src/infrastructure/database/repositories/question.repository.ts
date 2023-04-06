import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../entities';
import { paginate } from 'nestjs-typeorm-paginate';

export class QuestionRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private repository: Repository<QuestionEntity>,
  ) {}

  async save(question: QuestionEntity) {
    return await this.repository.save(question);
  }

  async getAll(page: number, perPage: number, sort: string, username: string) {
    let query = {};
    if (username) {
      query = {
        author: { username },
      };
    }
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
    return await paginate<QuestionEntity>(
      this.repository,
      {
        page,
        limit: perPage,
      },
      {
        where: {
          isDeleted: false,
          ...query,
        },
        relations: ['author'],
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }
}
