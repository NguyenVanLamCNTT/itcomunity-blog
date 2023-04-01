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
    return await this.seriesRepository.save(series);
  }

  async findAll(
    page: number,
    perPage: number,
    sort: string,
    username?: string,
  ) {
    const query = this.seriesRepository
      .createQueryBuilder('series')
      .where('series.isDeleted = :status', { status: false })
      .where('series.status = :status', { status: 'PUBLISH' })
      .innerJoin('series.author', 'user')
      .addSelect('user.id')
      .addSelect('user.fullName')
      .addSelect('user.avatar')
      .addSelect('user.username')
      .orderBy(`series.created`, 'DESC');

    if (username) {
      query.where('user.username = :username', { username });
    }
    if (sort) {
      const filed = sort.split(',')[0];
      const direction = sort.split(',')[1] === 'asc' ? 'ASC' : 'DESC';

      query.orderBy(`series.${filed}`, direction);
    }

    return await paginate<SeriesEntity>(query, { page, limit: perPage });
  }

  async findById(id: number) {
    return await this.seriesRepository.findOne({ where: { id } });
  }

  async findByUser(
    userId: number,
    page: number,
    perPage: number,
    sort: string,
  ) {
    if (sort) {
      const filed = sort.split(',')[0];
      const direction = sort.split(',')[1] === 'asc' ? 'ASC' : 'DESC';
      const query = this.seriesRepository
        .createQueryBuilder('series')
        .where('series.isDeleted = :status', { status: false })
        .where('series.author.id = :userId', { userId: userId })
        .innerJoin('series.author', 'user')
        .addSelect('user.id')
        .addSelect('user.fullName')
        .addSelect('user.username')
        .addSelect('user.avatar')
        .orderBy(`series.${filed}`, direction);

      return await paginate<SeriesEntity>(query, { page, limit: perPage });
    }

    const query = this.seriesRepository
      .createQueryBuilder('series')
      .where('series.isDeleted = :status', { status: false })
      .where('series.author.id = :userId', { userId: userId })
      .innerJoin('series.author', 'user')
      .addSelect('user.id')
      .addSelect('user.fullName')
      .addSelect('user.avatar')
      .addSelect('user.username')
      .orderBy(`series.created`, 'DESC');

    return await paginate<SeriesEntity>(query, { page, limit: perPage });
  }
}
