import { ArtistDto } from './artist.dto';
import { AlbumDto } from './album.dto';
import { TrackDto } from './track.dto';

export class FavoritesDto {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: ArtistDto[];
  albums: AlbumDto[];
  tracks: TrackDto[];
}
