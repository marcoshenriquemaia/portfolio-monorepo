import { UpdateUserDto } from '../dtos/user';
import { User } from '../interfaces/user';

export abstract class UserRepositoryAbstract {
  abstract create(data: User): Promise<User>;
  abstract update(id: string, data: UpdateUserDto): Promise<'OK'>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User>;
}
