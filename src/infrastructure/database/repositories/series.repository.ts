import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { SeriesEntity } from '../entities';

export class SeriesRepository {
  constructor(
    @InjectRepository(SeriesEntity)
    private seriesRepository: Repository<SeriesEntity>,
  ) {}

  async save(series: SeriesEntity) {
    return this.seriesRepository.save(series);
  }

  async findAll(page: number, perPage: number, sort: string) {
    if (sort) {
      const filed = sort.split(',')[0];
      const direction = sort.split(',')[1] === 'asc' ? 'ASC' : 'DESC';
      const query = this.seriesRepository
        .createQueryBuilder('series')
        .where('series.isDeleted = :status', { status: false })
        .where('series.status = :status', { status: 'public' })
        .innerJoin('series.author', 'user')
        .addSelect('user.id')
        .addSelect('user.fullName')
        .addSelect('user.username')
        .orderBy(`series.${filed}`, direction);

      return await paginate<SeriesEntity>(query, { page, limit: perPage });
    }

    const query = this.seriesRepository
      .createQueryBuilder('series')
      .where('series.isDeleted = :status', { status: false })
      .where('series.status = :status', { status: 'public' })
      .innerJoin('series.author', 'user')
      .addSelect('user.id')
      .addSelect('user.fullName')
      .addSelect('user.username');

    return await paginate<SeriesEntity>(query, { page, limit: perPage });
  }
}
