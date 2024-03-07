import { IsNumber, IsOptional, IsString } from "class-validator";

export class TrackDto {
  @IsString()
  @IsOptional()
  id: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  artistId: string | null;
  @IsString()
  @IsOptional()
  albumId: string | null;
  @IsNumber()
  duration: number;
}
