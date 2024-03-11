import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserDtoWithoutId,
} from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDtoWithoutId[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDtoWithoutId> {
    return this.userService.getUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async addUser(@Body() body: CreateUserDto): Promise<UserDtoWithoutId> {
    return this.userService.createUser(body);
  }

  @Put('/:id')
  async changeUser(
    @Body() body: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDtoWithoutId> {
    return this.userService.updateUser(body, id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
