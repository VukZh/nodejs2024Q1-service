import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from "@nestjs/common";
import { FavoritesDto, FavoritesResponse } from "../dto/favorites.dto";
import { TrackService } from "../track/track.service";
import { AlbumService } from "../album/album.service";
import { ArtistService } from "../artist/artist.service";

@Injectable()
export class FavoritesService {

  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  @Inject(ArtistService)
  private readonly artistService: ArtistService;

  private readonly favorites: FavoritesDto = {
    artists: [],
    albums: [],
    tracks: []
  };

  getFavorites(): FavoritesResponse {
    const artistArr = this.artistService.getAllArtists().filter(artist => this.favorites.artists.includes(artist.id));
    const albumArr = this.albumService.getAllAlbums().filter(album => this.favorites.albums.includes(album.id));
    const trackArr = this.trackService.getAllTracks().filter(track => this.favorites.tracks.includes(track.id));


    return {
      artists: artistArr,
      albums: albumArr,
      tracks: trackArr
    };
  }

  addTrack(trackId: string) {
    if (!this.trackService.getAllTracks().map(t => t.id).includes(trackId)) {
      throw new UnprocessableEntityException()
    }
    this.favorites.tracks.push(trackId);
  }

  addAlbum(albumId: string) {
    if (!this.albumService.getAllAlbums().map(a => a.id).includes(albumId)) {
      throw new UnprocessableEntityException()
    }
    this.favorites.albums.push(albumId);
  }

  addArtist(artistId: string) {
    if (!this.artistService.getAllArtists().map(a => a.id).includes(artistId)) {
      throw new UnprocessableEntityException()
    }
    this.favorites.artists.push(artistId);
  }

  deleteTrack(trackId: string) {
    const findTrackIndex = this.favorites.tracks.findIndex(
      (t) => t === trackId,
    );
    if (findTrackIndex === -1) {
      throw new NotFoundException()
    }
    this.favorites.tracks.splice(findTrackIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  deleteAlbum(albumId: string) {
    const findAlbumIndex = this.favorites.albums.findIndex(
      (a) => a === albumId,
    );
    if (findAlbumIndex === -1) {
      throw new NotFoundException()
    }
    this.favorites.albums.splice(findAlbumIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);

  }

  deleteArtist(artistId: string) {
    const findArtistIndex = this.favorites.artists.findIndex(
      (a) => a === artistId,
    );
    if (findArtistIndex === -1) {
      throw new NotFoundException()
    }
    this.favorites.artists.splice(findArtistIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
