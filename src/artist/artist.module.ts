import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from "./artist.controller";
import { TrackService } from "../track/track.service";
import { TrackModule } from "../track/track.module";
import { AlbumModule } from "../album/album.module";

@Module({
  imports: [TrackModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService]
})
export class ArtistModule {}
