import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { PrismaService } from "../prisma.service";

@Module({
  imports: [TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService],
  exports: [AlbumService],
})
export class AlbumModule {}
