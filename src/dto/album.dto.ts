import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AlbumDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  year: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  artistId: string | null;
}
