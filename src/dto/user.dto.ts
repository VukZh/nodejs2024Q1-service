import { IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsString()
  id: string;
  @IsString()
  @IsOptional()
  login: string;
  @IsString()
  @IsOptional()
  password: string;
  @IsNumber()
  @IsOptional()
  version: number;
  @IsNumber()
  @IsOptional()
  createdAt: number;
  @IsNumber()
  @IsOptional()
  updatedAt: number;
}

export class CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}

export type UserDtoWithoutId = Omit<UserDto, "id">