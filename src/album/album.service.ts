import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumDto } from '../dto/album.dto';

@Injectable()
export class AlbumService {
  private readonly albums: AlbumDto[] = [];

  createTrack(album: Omit<AlbumDto, 'id'>) {
    const newAlbum = { ...album, id: uuidv4() };
    this.albums.push(newAlbum);
  }

  getAllAlbums(): AlbumDto[] {
    return this.albums;
  }

  getAlbum(id: string): AlbumDto {
    const findAlbum = this.albums.find((a) => a.id === id);
    return findAlbum;
  }

  updateAlbum(
    updatedAlbum: Partial<Pick<AlbumDto, 'id'>> & Partial<Omit<AlbumDto, 'id'>>,
  ): AlbumDto {
    const findAlbumIndex = this.albums.findIndex(
      (t) => t.id === updatedAlbum.id,
    );
    this.albums[findAlbumIndex] = {
      ...this.albums[findAlbumIndex],
      ...updatedAlbum,
    };
    return this.albums[findAlbumIndex];
  }

  deleteAlbum(id: string): boolean {
    const findAlbumIndex = this.albums.findIndex((a) => a.id === id);
    this.albums.splice(findAlbumIndex, 1);
    return findAlbumIndex !== -1 ? true : false;
  }
}
