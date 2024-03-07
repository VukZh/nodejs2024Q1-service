import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from '../dto/artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: ArtistDto[] = [];

  createArtist(artist: Omit<ArtistDto, 'id'>) {
    if (!Object.keys(artist).length) {
      throw new BadRequestException()
    }
    const newArtist = { ...artist, id: uuidv4() };
    this.artists.push(newArtist);
    return newArtist
  }

  getAllArtists(): ArtistDto[] {
    return this.artists;
  }

  getArtist(id: string): ArtistDto {
    if (!this.artists.some(a => a.id === id)) {
      throw new NotFoundException()
    }
    const findArtist = this.artists.find((a) => a.id === id);
    return findArtist;
  }

  updateArtist(
    updatedArtist: Partial<Pick<ArtistDto, 'id'>> &
      Partial<Omit<ArtistDto, 'id'>>, id: string
  ): ArtistDto {
    const findArtistIndex = this.artists.findIndex(
      (t) => t.id === id,
    );
    if (findArtistIndex === -1) {
      throw new NotFoundException()
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
      throw new NotFoundException()
    }
    this.artists.splice(findArtistIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
