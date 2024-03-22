import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesDto, FavoritesResponse } from '../dto/favorites.dto';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  @Inject(ArtistService)
  private readonly artistService: ArtistService;

  private readonly favorites: FavoritesDto = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async setInitialFavorites() {
    const check = await this.prisma.favorites.findMany();
    if (!check || !check?.length) {
      await this.prisma.favorites.create({
        data: {
          id: 1,
          artists: [],
          albums: [],
          tracks: [],
        },
      });
    }
  }

  async getFavorites(): Promise<FavoritesResponse> {
    const { tracks, albums, artists } = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });

    const artistArr = await this.artistService.getAllArtists();
    const filteredArtistArr = artistArr.filter((artist) =>
      artists.includes(artist.id),
    );
    const albumArr = await this.albumService.getAllAlbums();

    const filteredAlbumArr = albumArr.filter((album) =>
      albums.includes(album.id),
    );
    const trackArr = await this.trackService.getAllTracks();
    const filteredTrackArr = trackArr.filter((track) =>
      tracks.includes(track.id),
    );

    return {
      artists: filteredArtistArr,
      albums: filteredAlbumArr,
      tracks: filteredTrackArr,
    };
  }

  async addTrackToFavs(trackId: string) {
    const allTracks = await this.prisma.tracks.findMany();
    if (!allTracks.map((t) => t.id).includes(trackId)) {
      throw new UnprocessableEntityException();
    }

    const { tracks } = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });

    const addedTrack = [...tracks, trackId];
    await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        tracks: [...addedTrack],
      },
    });
  }

  async addAlbumToFavs(albumId: string) {
    const allAlbums = await this.prisma.albums.findMany();
    if (!allAlbums.map((t) => t.id).includes(albumId)) {
      throw new UnprocessableEntityException();
    }

    const { albums } = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });

    const addedAlbum = [...albums, albumId];
    await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        albums: [...addedAlbum],
      },
    });
  }

  async addArtistToFavs(artistId: string) {
    const allArtists = await this.prisma.artists.findMany();
    if (!allArtists.map((t) => t.id).includes(artistId)) {
      throw new UnprocessableEntityException();
    }

    const { artists } = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });

    const addedArtist = [...artists, artistId];
    await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        artists: [...addedArtist],
      },
    });
  }

  async deleteTrackFromFavs(trackId: string) {
    const { tracks } = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });

    const findTrackIndex = tracks.findIndex((t) => t === trackId);
    if (findTrackIndex === -1) {
      throw new NotFoundException();
    }
    const deletedTrack = [...tracks];
    deletedTrack.splice(findTrackIndex, 1);

    await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        tracks: [...deletedTrack],
      },
    });
  }

  async deleteAlbumFromFavs(albumId: string) {
    const { albums } = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });

    const findAlbumIndex = albums.findIndex((t) => t === albumId);
    if (findAlbumIndex === -1) {
      throw new NotFoundException();
    }

    const deletedAlbum = [...albums];
    deletedAlbum.splice(findAlbumIndex, 1);

    await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        albums: [...deletedAlbum],
      },
    });
  }

  async deleteArtistFromFavs(artistId: string) {
    const { artists } = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });

    const findArtistIndex = artists.findIndex((t) => t === artistId);
    if (findArtistIndex === -1) {
      throw new NotFoundException();
    }
    const deletedArtist = [...artists];
    deletedArtist.splice(findArtistIndex, 1);

    await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        artists: [...deletedArtist],
      },
    });
  }
}
