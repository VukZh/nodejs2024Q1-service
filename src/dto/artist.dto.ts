import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ArtistDto {
  @IsString()
  id: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
