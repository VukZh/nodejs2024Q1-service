import { IsNumber, IsOptional, IsString } from "class-validator";

export class AlbumDto {
  @IsString()
  @IsOptional()
  id: string;
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsString()
  @IsOptional()
  artistId: string | null;
}
