import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  createUser(post: Omit<UserDto, 'id'>) {
    const newUser = { ...post, id: uuidv4() };
    this.users.push(newUser);
  }

  getAllUsers(): UserDto[] {
    return this.users;
  }

  getUser(id: string): UserDto {
    const findUser = this.users.find((u) => u.id === id);
    return findUser;
  }

  updateUser(
    updatedUser: Partial<Pick<UserDto, 'id'>> & Partial<Omit<UserDto, 'id'>>,
  ): UserDto {
    const findUserIndex = this.users.findIndex((u) => u.id === updatedUser.id);
    this.users[findUserIndex] = {
      ...this.users[findUserIndex],
      ...updatedUser,
    };
    return this.users[findUserIndex];
  }

  deleteUser(id: string): boolean {
    const findUserIndex = this.users.findIndex((u) => u.id === id);
    this.users.splice(findUserIndex, 1);
    return findUserIndex !== -1 ? true : false;
  }
}
