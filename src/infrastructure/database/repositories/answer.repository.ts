import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from '../entities';
import { Repository } from 'typeorm';

export class AnswerRepository {
  constructor(
    @InjectRepository(AnswerEntity)
    private repository: Repository<AnswerEntity>,
  ) {}

  async save(answer: AnswerEntity) {
    return await this.repository.save(answer);
  }
}
