import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../entities';

export class QuestionRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private repository: Repository<QuestionEntity>,
  ) {}

  async save(question: QuestionEntity) {
    return await this.repository.save(question);
  }
}
