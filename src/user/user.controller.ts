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
  UserDtoWithoutPassword,
} from '../dto/user.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ status: 200, description: 'Users received' })
  @Get()
  async getAllUsers(): Promise<UserDtoWithoutPassword[]> {
    return await this.userService.getAllUsers();
  }

  @ApiOkResponse({ status: 200, description: 'User is retrieved by his id' })
  @ApiBadRequestResponse({ status: 400, description: 'User`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'User doesn`t exist' })
  @Get('/:id')
  async getUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDtoWithoutPassword> {
    return this.userService.getUser(id);
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'User created',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'User`s body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async addUser(@Body() body: CreateUserDto): Promise<UserDtoWithoutPassword> {
    return await this.userService.createUser(body);
  }

  @ApiOkResponse({ status: 200, description: 'User updated' })
  @ApiBadRequestResponse({ status: 400, description: 'User`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'User doesn`t exist' })
  @ApiForbiddenResponse({
    status: 403,
    description: 'User`s old password is wrong',
  })
  @Put('/:id')
  async changeUser(
    @Body() body: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDtoWithoutPassword> {
    return await this.userService.updateUser(body, id);
  }

  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'User`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'User doesn`t exist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
