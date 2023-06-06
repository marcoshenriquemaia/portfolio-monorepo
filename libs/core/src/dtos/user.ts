import { Directions } from '../interfaces/position';
import { User } from '../interfaces/user';
import { UserIdle } from '../interfaces/user-status';

export interface UpdateUserDto {
  name?: string;
  position?: {
    x: number;
    y: number;
  };
  status?: UserIdle;
  direction?: Directions;
}

export type UserDto = User;
