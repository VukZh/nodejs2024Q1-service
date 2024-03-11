import { ArtistDto } from './artist.dto';
import { AlbumDto } from './album.dto';
import { TrackDto } from './track.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesDto {
  @ApiProperty()
  artists: string[];
  @ApiProperty()
  albums: string[];
  @ApiProperty()
  tracks: string[];
}

export interface FavoritesResponse {
  artists: ArtistDto[];
  albums: AlbumDto[];
  tracks: TrackDto[];
}
