import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UserDto } from '../dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  createUser(user: CreateUserDto) {
    const newUser: UserDto = {
      id: uuidv4(),
      login: user.login,
      password: user.password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers(): UserDto[] {
    return this.users;
  }

  getUser(id: string): UserDto {
    const findUser = this.users.find((u) => u.id === id);
    return findUser;
  }

  updateUser(updatedUser: UpdatePasswordDto, id: string): UserDto {
    const findUserIndex = this.users.findIndex((u) => u.id === id);
    const findUser = {
      ...this.users[findUserIndex],
      password: updatedUser.newPassword,
      version: this.users[findUserIndex].version++,
      updatedAt: Date.now(),
    };
    this.users[findUserIndex] = { ...findUser };
    return this.users[findUserIndex];
  }

  deleteUser(id: string): boolean {
    const findUserIndex = this.users.findIndex((u) => u.id === id);
    this.users.splice(findUserIndex, 1);
    return findUserIndex !== -1 ? true : false;
  }
}
