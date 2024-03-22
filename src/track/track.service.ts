import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackDto } from '../dto/track.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  // private readonly tracks: TrackDto[] = [];

  async createTrack(track: TrackDto) {
    const newTrack = { ...track, id: uuidv4() };

    await this.prisma.tracks.create({
      data: {
        id: newTrack.id,
        name: newTrack.name,
        album_id: newTrack.albumId,
        artist_id: newTrack.artistId,
        duration: newTrack.duration,
      },
    });

    const addedTrack = await this.prisma.tracks.findUnique({
      where: { id: newTrack.id },
    });
    const responseTrack = {
      id: addedTrack.id,
      name: addedTrack.name,
      albumId: addedTrack.album_id,
      artistId: addedTrack.artist_id,
      duration: addedTrack.duration,
    };
    return responseTrack;
  }

  async getAllTracks(): Promise<TrackDto[]> {
    const responseTracks = await this.prisma.tracks.findMany();

    const allTracks = responseTracks.map((t) => ({
      id: t.id,
      name: t.name,
      artistId: t.artist_id,
      albumId: t.album_id,
      duration: t.duration,
    }));
    return allTracks;
  }

  async getTrack(id: string): Promise<TrackDto> {
    const findTrack = await this.prisma.tracks.findUnique({
      where: { id: id },
    });
    if (!findTrack?.id) {
      throw new NotFoundException();
    }
    const responseTrack = {
      id: findTrack.id,
      name: findTrack.name,
      albumId: findTrack.album_id,
      artistId: findTrack.artist_id,
      duration: findTrack.duration,
    };
    return responseTrack;
  }

  async updateTrack(updatedTrack: TrackDto, id: string): Promise<TrackDto> {
    if (!Object.keys(updatedTrack).length) {
      throw new BadRequestException();
    }
    const findTrack = await this.prisma.tracks.findUnique({
      where: { id: id },
    });

    if (!findTrack?.id) {
      throw new NotFoundException();
    }

    await this.prisma.tracks.update({
      where: { id: id },
      data: {
        name: updatedTrack.name,
        album_id: updatedTrack.albumId,
        artist_id: updatedTrack.artistId,
        duration: updatedTrack.duration,
      },
    });

    const changedTrack = await this.prisma.tracks.findUnique({
      where: { id: id },
    });
    const responseTrack = {
      id: changedTrack.id,
      name: changedTrack.name,
      albumId: changedTrack.album_id,
      artistId: changedTrack.artist_id,
      duration: changedTrack.duration,
    };
    return responseTrack;
  }

  async deleteTrack(id: string) {
    const findTrack = await this.prisma.tracks.findUnique({
      where: { id: id },
    });
    if (!findTrack?.id) {
      throw new NotFoundException();
    }
    await this.prisma.tracks.delete({ where: { id: id } });
    return;
  }

  async deleteArtistId(id: string) {
    const findTrack = await this.prisma.tracks.findFirst({
      where: { artist_id: id },
    });

    if (findTrack?.name) {
      await this.prisma.tracks.update({
        where: { id: findTrack.id },
        data: {
          name: findTrack.name,
          album_id: findTrack.album_id,
          artist_id: null,
          duration: findTrack.duration,
        },
      });
    }
  }

  async deleteAlbumId(id: string) {
    const findTrack = await this.prisma.tracks.findFirst({
      where: { album_id: id },
    });

    if (findTrack?.name) {
      await this.prisma.tracks.update({
        where: { id: findTrack.id },
        data: {
          name: findTrack.name,
          album_id: null,
          artist_id: findTrack.artist_id,
          duration: findTrack.duration,
        },
      });
    }
  }
}
