import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
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
