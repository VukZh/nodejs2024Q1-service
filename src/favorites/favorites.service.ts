import { Injectable } from '@nestjs/common';
import { FavoritesDto } from '../dto/favorites.dto';

@Injectable()
export class FavoritesService {
  private readonly favorites: FavoritesDto = {
    artists: [],
    albums: [],
    tracks: []
  };

  getFavorites(): FavoritesDto {
    return this.favorites;
  }

  addTrack(trackId: string) {
    this.favorites.tracks.push(trackId);
  }

  addAlbum(albumId: string) {
    this.favorites.albums.push(albumId);
  }

  addArtist(artistId: string) {
    this.favorites.artists.push(artistId);
  }

  deleteTrack(trackId: string) {
    const findTrackIndex = this.favorites.tracks.findIndex(
      (t) => t === trackId,
    );
    this.favorites.tracks.splice(findTrackIndex, 1);
  }

  deleteAlbum(albumId: string) {
    const findAlbumIndex = this.favorites.albums.findIndex(
      (a) => a === albumId,
    );
    this.favorites.albums.splice(findAlbumIndex, 1);
  }

  deleteArtist(artistId: string) {
    const findArtistIndex = this.favorites.artists.findIndex(
      (a) => a === artistId,
    );
    this.favorites.artists.splice(findArtistIndex, 1);
  }
}
