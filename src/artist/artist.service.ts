import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from '../dto/artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: ArtistDto[] = [];

  createArtist(artist: Omit<ArtistDto, 'id'>) {
    const newArtist = { ...artist, id: uuidv4() };
    this.artists.push(newArtist);
  }

  getAllArtists(): ArtistDto[] {
    return this.artists;
  }

  getArtist(id: string): ArtistDto {
    const findArtist = this.artists.find((a) => a.id === id);
    return findArtist;
  }

  updateArtist(
    updatedArtist: Partial<Pick<ArtistDto, 'id'>> &
      Partial<Omit<ArtistDto, 'id'>>,
  ): ArtistDto {
    const findArtistIndex = this.artists.findIndex(
      (t) => t.id === updatedArtist.id,
    );
    this.artists[findArtistIndex] = {
      ...this.artists[findArtistIndex],
      ...updatedArtist,
    };
    return this.artists[findArtistIndex];
  }

  deleteArtist(id: string): boolean {
    const findArtistIndex = this.artists.findIndex((a) => a.id === id);
    this.artists.splice(findArtistIndex, 1);
    return findArtistIndex !== -1 ? true : false;
  }
}
