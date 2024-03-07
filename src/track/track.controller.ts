import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put, UsePipes, ValidationPipe
} from "@nestjs/common";
import { TrackService } from "./track.service";
import { TrackDto } from "../dto/track.dto";

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {
  }

  @Get()
  async getAllTracks(): Promise<TrackDto[]> {
    return this.trackService.getAllTracks();
  };

  @Get("/:id")
  async getTrack(@Param("id", ParseUUIDPipe) id: string): Promise<TrackDto> {
    return this.trackService.getTrack(id);
  };

  // @UsePipes(new ValidationPipe())

  @Post()
  async addTrack(@Body() body: TrackDto ): Promise<TrackDto> {
    return this.trackService.createTrack(body);
  };

  @Put("/:id")
  async changeTrack(@Body() body: TrackDto , @Param("id", ParseUUIDPipe) id: string): Promise<TrackDto> {
    return this.trackService.updateTrack(body, id);
  };

  @Delete("/:id")
  async deleteTrack(@Param("id", ParseUUIDPipe) id: string): Promise<HttpException> {
    return this.trackService.deleteTrack(id);
  };
}
