import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ArtistDto {
  @IsOptional()
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
