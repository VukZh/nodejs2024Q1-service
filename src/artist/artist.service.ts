import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from '../dto/artist.dto';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  private readonly artists: ArtistDto[] = [];

  async createArtist(artist: Omit<ArtistDto, 'id'>): Promise<ArtistDto> {
    if (!Object.keys(artist).length) {
      throw new BadRequestException();
    }

    const newArtist = { ...artist, id: uuidv4() };

    await this.prisma.artists.create({
      data: {
        id: newArtist.id,
        name: newArtist.name,
        grammy: newArtist.grammy,
      },
    });

    const addedArtist = await this.prisma.artists.findUnique({
      where: { id: newArtist.id },
    });

    return addedArtist;
  }

  async getAllArtists(): Promise<ArtistDto[]> {
    const responseArtists = await this.prisma.artists.findMany();

    return responseArtists;
  }

  async getArtist(id: string): Promise<ArtistDto> {
    const findArtist = await this.prisma.artists.findUnique({
      where: { id: id },
    });
    if (!findArtist?.id) {
      throw new NotFoundException();
    }

    return findArtist;
  }

  async updateArtist(
    updatedArtist: Partial<Pick<ArtistDto, 'id'>> &
      Partial<Omit<ArtistDto, 'id'>>,
    id: string,
  ): Promise<ArtistDto> {
    if (!Object.keys(updatedArtist).length) {
      throw new BadRequestException();
    }
    const findArtist = await this.prisma.artists.findUnique({
      where: { id: id },
    });

    if (!findArtist?.id) {
      throw new NotFoundException();
    }

    await this.prisma.artists.update({
      where: { id: id },
      data: {
        name: updatedArtist.name,
        grammy: updatedArtist.grammy,
      },
    });

    const changedArtist = await this.prisma.artists.findUnique({
      where: { id: id },
    });
    return changedArtist;
  }

  async deleteArtist(id: string) {
    const findArtist = await this.prisma.artists.findUnique({
      where: { id: id },
    });
    if (!findArtist?.id) {
      throw new NotFoundException();
    }
    await this.prisma.artists.delete({ where: { id: id } });
    await this.trackService.deleteArtistId(id);
    await this.albumService.deleteArtistId(id);

    return;
  }
}
