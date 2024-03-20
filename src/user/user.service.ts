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
  UserDtoWithoutPassword,
} from '../dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private readonly users: UserDto[] = [];

  async createUser(user: CreateUserDto): Promise<UserDtoWithoutPassword> {
    const newUser: UserDto = {
      id: uuidv4(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await this.prisma.users.create({
      data: {
        id: newUser.id,
        login: newUser.login,
        password: newUser.password,
        version: newUser.version,
        created_at: new Date(newUser.createdAt),
        updated_at: new Date(newUser.updatedAt),
      },
    });

    const addedUser = await this.prisma.users.findUnique({
      where: { id: newUser.id },
    });
    const responseUser = {
      id: addedUser.id,
      login: addedUser.login,
      version: addedUser.version,
      createdAt: addedUser.created_at.getTime(),
      updatedAt: addedUser.updated_at.getTime(),
    };
    return responseUser;
  }

  async getAllUsers(): Promise<UserDtoWithoutPassword[]> {
    const responseUsers = await this.prisma.users.findMany();
    const allUsers = responseUsers.map((u) => ({
      id: u.id,
      login: u.login,
      version: u.version,
      createdAt: u.created_at.getTime(),
      updatedAt: u.updated_at.getTime(),
    }));
    return allUsers;
  }

  async getUser(id: string): Promise<UserDtoWithoutPassword> {
    const findUser = await this.prisma.users.findUnique({ where: { id: id } });
    if (!findUser?.id) {
      throw new NotFoundException();
    }
    const responseUser = {
      id: findUser.id,
      login: findUser.login,
      version: findUser.version,
      createdAt: findUser.created_at.getTime(),
      updatedAt: findUser.updated_at.getTime(),
    };
    return responseUser;
  }

  async updateUser(
    updatedUser: UpdatePasswordDto,
    id: string,
  ): Promise<UserDtoWithoutPassword> {
    if (!Object.keys(updatedUser).length) {
      throw new BadRequestException();
    }
    const findUser = await this.prisma.users.findUnique({ where: { id: id } });

    if (!findUser?.id) {
      throw new NotFoundException();
    }
    if (findUser.password !== updatedUser.oldPassword) {
      throw new ForbiddenException();
    }
    await this.prisma.users.update({
      where: { id: id },
      data: {
        password: updatedUser.newPassword,
        version: findUser.version + 1,
        updated_at: new Date(),
      },
    });

    const changedUser = await this.prisma.users.findUnique({
      where: { id: id },
    });
    const responseUser = {
      id: changedUser.id,
      login: changedUser.login,
      version: changedUser.version,
      createdAt: changedUser.created_at.getTime(),
      updatedAt: changedUser.updated_at.getTime(),
    };
    return responseUser;
  }

  async deleteUser(id: string) {
    const findUser = await this.prisma.users.findUnique({
      where: { id: id },
    });
    if (!findUser?.id) {
      throw new NotFoundException();
    }
    await this.prisma.users.delete({ where: { id: id } });
    return;
  }
}
