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

  async findByPostId(postId: number) {
    return await this.repository.find({ where: { post: { id: postId } } });
  }

  async findByPostIdAndSeriesId(seriesId: number, postId: number) {
    return await this.repository.findOne({
      where: { series: { id: seriesId }, post: { id: postId } },
    });
  }

  async remove(entity: SeriesPostEntity) {
    await this.repository.remove(entity);
  }
}
