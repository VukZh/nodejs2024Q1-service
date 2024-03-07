import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdatePasswordDto, UserDto } from "../dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  };

  @Get(":/id")
  async getUser(@Param("id") id: string): Promise<UserDto> {
    return this.userService.getUser(id);
  };

  @Post()
  async addUser(@Body() body: CreateUserDto ): Promise<UserDto> {
    return this.userService.createUser(body);
  };

  @Put(":/id")
  async changeUser(@Body() body: UpdatePasswordDto , @Param("id") id: string): Promise<UserDto> {
    return this.userService.updateUser(body, id);
  };


  @Delete(":/id")
  async deleteUser(@Param("id") id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  };

}


