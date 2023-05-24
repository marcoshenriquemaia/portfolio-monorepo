import { UserIdle } from './user-status';

export interface User {
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
  status: UserIdle;
}
