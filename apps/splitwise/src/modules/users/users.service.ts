import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private userRepo: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(UserEntity);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepo.findOneBy({ email });
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return this.userRepo.findOneBy({ id });
  }

  async create(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<UserEntity> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }
}
