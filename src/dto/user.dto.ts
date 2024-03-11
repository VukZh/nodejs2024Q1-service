import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsString()
  id: string;
  @IsString()
  @IsOptional()
  login: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  version: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  createdAt: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  updatedAt: number;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  login: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;
  @ApiProperty()
  @IsString()
  newPassword: string;
}

export type UserDtoWithoutId = Omit<UserDto, 'id'>;
