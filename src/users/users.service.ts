import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // @InjectRepository will help with injecting the User repository
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Note: hooks will not work if using save() without entity instance
  create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number): Promise<User> {
    if (!id) {
      return;
    }
    return this.repo.findOneBy({ id });
  }

  find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user not found with id: ${id}`);
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user not found with id: ${id}`);
    }
    return this.repo.remove(user);
  }
}
