import { Injectable } from '@nestjs/common';
import { TrackDto } from '../dto/track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private readonly tracks: TrackDto[] = [];

  createTrack(track: Omit<TrackDto, 'id'>) {
    const newTrack = { ...track, id: uuidv4() };
    this.tracks.push(newTrack);
  }

  getAllTracks(): TrackDto[] {
    return this.tracks;
  }

  getTrack(id: string): TrackDto {
    const findTrack = this.tracks.find((t) => t.id === id);
    return findTrack;
  }

  updateTrack(
    updatedTrack: Partial<Pick<TrackDto, 'id'>> & Partial<Omit<TrackDto, 'id'>>,
  ): TrackDto {
    const findTrackIndex = this.tracks.findIndex(
      (t) => t.id === updatedTrack.id,
    );
    this.tracks[findTrackIndex] = {
      ...this.tracks[findTrackIndex],
      ...updatedTrack,
    };
    return this.tracks[findTrackIndex];
  }

  deleteTrack(id: string): boolean {
    const findTrackIndex = this.tracks.findIndex((t) => t.id === id);
    this.tracks.splice(findTrackIndex, 1);
    return findTrackIndex !== -1 ? true : false;
  }
}
