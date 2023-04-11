import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity, UserEntity } from '../entities';
import { paginate } from 'nestjs-typeorm-paginate';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(page: number, perPage: number, sort: string) {
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
    return await paginate<UserEntity>(
      this.usersRepository,
      {
        page,
        limit: perPage,
      },
      {
        where: {
          isDeleted: false,
        },
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async save(user: UserEntity) {
    await this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findByEmailOrUsername(textSearch: string) {
    return await this.usersRepository.findOne({
      where: [{ email: textSearch }, { username: textSearch }],
    });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }
}
