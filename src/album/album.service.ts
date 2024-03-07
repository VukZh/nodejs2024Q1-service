import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { AlbumDto } from '../dto/album.dto';

@Injectable()
export class AlbumService {
  private readonly albums: AlbumDto[] = [];

  createTrack(album: Omit<AlbumDto, 'id'>) {
    const newAlbum = { ...album, id: uuidv4() };
    this.albums.push(newAlbum);
    return newAlbum
  }

  getAllAlbums(): AlbumDto[] {
    return this.albums;
  }

  getAlbum(id: string): AlbumDto {
    if (!this.albums.some(a => a.id === id)) {
      throw new NotFoundException()
    }
    const findAlbum = this.albums.find((a) => a.id === id);
    return findAlbum;
  }

  updateAlbum(
    updatedAlbum: Partial<Pick<AlbumDto, 'id'>> & Partial<Omit<AlbumDto, 'id'>>, id: string
  ): AlbumDto {
    const findAlbumIndex = this.albums.findIndex(
      (t) => t.id === id,
    );
    if (findAlbumIndex === -1) {
      throw new NotFoundException()
    }
    this.albums[findAlbumIndex] = {
      ...this.albums[findAlbumIndex],
      ...updatedAlbum,
    };
    return this.albums[findAlbumIndex];
  }

  deleteAlbum(id: string): HttpException {
    const findAlbumIndex = this.albums.findIndex((a) => a.id === id);
    if (findAlbumIndex === -1) {
      throw new NotFoundException()
    }
    this.albums.splice(findAlbumIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
