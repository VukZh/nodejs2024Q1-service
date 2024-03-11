import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserDto,
  UserDtoWithoutId,
} from '../dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  createUser(user: CreateUserDto): UserDtoWithoutId {
    const newUser: UserDto = {
      id: uuidv4(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const responseUser = { ...newUser };
    delete responseUser.password;
    return responseUser;
  }

  getAllUsers(): UserDtoWithoutId[] {
    const responseUsers = this.users.map((u) => {
      const newU = { ...u };
      delete newU.password;
      return newU;
    });
    return responseUsers;
  }

  getUser(id: string): UserDtoWithoutId {
    if (!this.users.some((u) => u.id === id)) {
      throw new NotFoundException();
    }
    const findUser = this.users.find((u) => u.id === id);
    const responseUser = { ...findUser };
    delete responseUser.password;
    return responseUser;
  }

  updateUser(updatedUser: UpdatePasswordDto, id: string): UserDtoWithoutId {
    if (!Object.keys(updatedUser).length) {
      throw new BadRequestException();
    }
    const findUserIndex = this.users.findIndex((u) => u.id === id);
    if (findUserIndex === -1) {
      throw new NotFoundException();
    }
    if (this.users[findUserIndex].password !== updatedUser.oldPassword) {
      throw new ForbiddenException();
    }
    const findUser = {
      ...this.users[findUserIndex],
      password: updatedUser.newPassword,
      version: this.users[findUserIndex].version + 1,
      updatedAt: Date.now(),
    };
    this.users[findUserIndex] = { ...findUser };
    const responseUser = { ...findUser };
    delete responseUser.password;
    return responseUser;
  }

  deleteUser(id: string) {
    const findUserIndex = this.users.findIndex((u) => u.id === id);
    if (findUserIndex === -1) {
      throw new NotFoundException();
    }
    this.users.splice(findUserIndex, 1);
  }
}
