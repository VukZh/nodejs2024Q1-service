import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { TrackDto } from '../dto/track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private readonly tracks: TrackDto[] = [];

  createTrack(track: TrackDto) {
    const newTrack = { ...track, id: uuidv4() };
    this.tracks.push(newTrack);
    return newTrack
  }

  getAllTracks(): TrackDto[] {
    return this.tracks;
  }

  getTrack(id: string): TrackDto {
    if (!this.tracks.some(t => t.id === id)) {
      throw new NotFoundException()
    }
    const findTrack = this.tracks.find((t) => t.id === id);
    return findTrack;
  }

  updateTrack(
    updatedTrack: TrackDto, id: string
  ): TrackDto {
    const findTrackIndex = this.tracks.findIndex(
      (t) => t.id === id,
    );
    console.log("findTrackIndex", findTrackIndex);
    if (findTrackIndex === -1) {
      throw new NotFoundException()
    }
    this.tracks[findTrackIndex] = {
      ...this.tracks[findTrackIndex],
      ...updatedTrack,
    };
    return this.tracks[findTrackIndex];
  }

  deleteTrack(id: string): HttpException {
    const findTrackIndex = this.tracks.findIndex((t) => t.id === id);
    if (findTrackIndex === -1) {
      throw new NotFoundException()
    }
    this.tracks.splice(findTrackIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
