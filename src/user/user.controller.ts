import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, HttpException,
  HttpStatus, NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put, UsePipes, ValidationPipe
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdatePasswordDto, UserDto, UserDtoWithoutId } from "../dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  async getAllUsers(): Promise<UserDtoWithoutId[]> {
    return this.userService.getAllUsers();
  };

  @Get("/:id")
  async getUser(@Param("id", ParseUUIDPipe) id: string): Promise<UserDtoWithoutId> {
    return this.userService.getUser(id);
  };

  @UsePipes(new ValidationPipe())
  @Post()
  async addUser(@Body() body: CreateUserDto ): Promise<UserDtoWithoutId> {
    return this.userService.createUser(body);
  };

  @Put("/:id")
  async changeUser(@Body() body: UpdatePasswordDto , @Param("id", ParseUUIDPipe) id: string): Promise<UserDtoWithoutId> {
    return this.userService.updateUser(body, id);
  };


  @Delete("/:id")
  async deleteUser(@Param("id", ParseUUIDPipe) id: string): Promise<HttpException> {
    return this.userService.deleteUser(id);
  };

}


