import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumDto } from '../dto/album.dto';
import { TrackService } from '../track/track.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  @Inject(TrackService)
  private readonly trackService: TrackService;

  private readonly albums: AlbumDto[] = [];

  async createAlbum(album: Omit<AlbumDto, 'id'>): Promise<AlbumDto> {
    const newAlbum = { ...album, id: uuidv4() };

    await this.prisma.albums.create({
      data: {
        id: newAlbum.id,
        name: newAlbum.name,
        year: newAlbum.year,
        artist_id: newAlbum.artistId,
      },
    });

    const addedAlbum = await this.prisma.albums.findUnique({
      where: { id: newAlbum.id },
    });
    const responseAlbum = {
      id: addedAlbum.id,
      name: addedAlbum.name,
      year: addedAlbum.year,
      artistId: addedAlbum.artist_id,
    };
    return responseAlbum;
  }

  async getAllAlbums(): Promise<AlbumDto[]> {
    const responseAlbums = await this.prisma.albums.findMany();

    const allAlbums = responseAlbums.map((a) => ({
      id: a.id,
      name: a.name,
      year: a.year,
      artistId: a.artist_id,
    }));
    return allAlbums;
  }

  async getAlbum(id: string): Promise<AlbumDto> {
    const findAlbum = await this.prisma.albums.findUnique({
      where: { id: id },
    });
    if (!findAlbum?.id) {
      throw new NotFoundException();
    }
    const responseAlbum = {
      id: findAlbum.id,
      name: findAlbum.name,
      year: findAlbum.year,
      artistId: findAlbum.artist_id,
    };
    return responseAlbum;
  }

  async updateAlbum(
    updatedAlbum: Partial<Pick<AlbumDto, 'id'>> & Partial<Omit<AlbumDto, 'id'>>,
    id: string,
  ): Promise<AlbumDto> {
    if (!Object.keys(updatedAlbum).length) {
      throw new BadRequestException();
    }
    const findAlbum = await this.prisma.albums.findUnique({
      where: { id: id },
    });

    if (!findAlbum?.id) {
      throw new NotFoundException();
    }

    await this.prisma.albums.update({
      where: { id: id },
      data: {
        name: updatedAlbum.name,
        year: updatedAlbum.year,
        artist_id: updatedAlbum.artistId,
      },
    });

    const changedAlbum = await this.prisma.albums.findUnique({
      where: { id: id },
    });
    const responseAlbum = {
      id: changedAlbum.id,
      name: changedAlbum.name,
      year: changedAlbum.year,
      artistId: changedAlbum.artist_id,
    };
    return responseAlbum;
  }

  async deleteAlbum(id: string) {
    const findAlbum = await this.prisma.albums.findUnique({
      where: { id: id },
    });
    if (!findAlbum?.id) {
      throw new NotFoundException();
    }
    await this.prisma.albums.delete({ where: { id: id } });
    await this.trackService.deleteAlbumId(id);
    return;
  }

  async deleteArtistId(id: string) {
    const findAlbum = await this.prisma.albums.findFirst({
      where: { artist_id: id },
    });
    if (findAlbum?.name) {
      await this.prisma.albums.update({
        where: { id: findAlbum.id },
        data: {
          name: findAlbum.name,
          year: findAlbum.year,
          artist_id: null,
        },
      });
    }
  }
}
