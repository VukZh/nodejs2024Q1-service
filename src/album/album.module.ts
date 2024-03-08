import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from "./album.controller";
import { TrackService } from "../track/track.service";
import { TrackModule } from "../track/track.module";

@Module({
  imports: [TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService]
})
export class AlbumModule {}
