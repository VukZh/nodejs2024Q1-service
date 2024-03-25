import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  artistId: string | null;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  albumId: string | null;
  @ApiProperty()
  @IsNumber()
  duration: number;
}
