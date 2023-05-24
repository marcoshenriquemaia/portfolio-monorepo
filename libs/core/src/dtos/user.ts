import { User } from '../interfaces/user';
import { UserIdle } from '../interfaces/user-status';

export interface UpdateUserDto {
  name?: string;
  position?: {
    x: number;
    y: number;
  };
  status?: UserIdle;
}

export type UserDto = User;
