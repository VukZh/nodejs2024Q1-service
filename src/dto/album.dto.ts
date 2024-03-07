import { IsNumber, IsOptional, IsString } from "class-validator";

export class AlbumDto {
  @IsString()
  id: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsNumber()
  @IsOptional()
  year: number;
  @IsString()
  @IsOptional()
  artistId: string | null;
}
