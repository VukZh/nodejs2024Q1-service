import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from '../dto/artist.dto';
import { TrackService } from '../track/track.service';
import { AlbumService } from "../album/album.service";

@Injectable()
export class ArtistService {
  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  // @Inject(TrackService)
  // private readonly trackService: TrackService;

  private readonly artists: ArtistDto[] = [];

  createArtist(artist: Omit<ArtistDto, 'id'>) {
    if (!Object.keys(artist).length) {
      throw new BadRequestException();
    }
    const newArtist = { ...artist, id: uuidv4() };
    this.artists.push(newArtist);
    return newArtist;
  }

  getAllArtists(): ArtistDto[] {
    return this.artists;
  }

  getArtist(id: string): ArtistDto {
    if (!this.artists.some((a) => a.id === id)) {
      throw new NotFoundException();
    }
    const findArtist = this.artists.find((a) => a.id === id);
    return findArtist;
  }

  updateArtist(
    updatedArtist: Partial<Pick<ArtistDto, 'id'>> &
      Partial<Omit<ArtistDto, 'id'>>,
    id: string,
  ): ArtistDto {
    const findArtistIndex = this.artists.findIndex((t) => t.id === id);
    if (findArtistIndex === -1) {
      throw new NotFoundException();
    }
    this.artists[findArtistIndex] = {
      ...this.artists[findArtistIndex],
      ...updatedArtist,
    };
    return this.artists[findArtistIndex];
  }

  deleteArtist(id: string): HttpException {
    const findArtistIndex = this.artists.findIndex((a) => a.id === id);
    if (findArtistIndex === -1) {
      throw new NotFoundException();
    }
    this.artists.splice(findArtistIndex, 1);
    this.trackService.deleteArtistId(id);
    this.albumService.deleteArtistId(id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
