import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeriesPostEntity } from '../entities';

export class SeriesPostRepository {
  constructor(
    @InjectRepository(SeriesPostEntity)
    private repository: Repository<SeriesPostEntity>,
  ) {}

  async save(entity: SeriesPostEntity) {
    await this.repository.save(entity);
  }

  async findBySeriesId(seriesId: number) {
    return await this.repository.find({ where: { series: { id: seriesId } } });
  }
}
