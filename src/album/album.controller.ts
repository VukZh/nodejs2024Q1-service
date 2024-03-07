import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes, ValidationPipe
} from "@nestjs/common";
import { ArtistService } from "../artist/artist.service";
import { ArtistDto } from "../dto/artist.dto";
import { AlbumService } from "./album.service";
import { AlbumDto } from "../dto/album.dto";

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {
  }

  @Get()
  async getAllAlbums(): Promise<AlbumDto[]> {
    return this.albumService.getAllAlbums();
  };

  @Get("/:id")
  async getAlbum(@Param("id", ParseUUIDPipe) id: string): Promise<AlbumDto> {
    return this.albumService.getAlbum(id);
  };

  // @UsePipes(new ValidationPipe())
  @Post()
  async addAlbum(@Body() body: AlbumDto ): Promise<AlbumDto> {
    console.log(">>>", body);
    return this.albumService.createTrack(body);
  };

  // @UsePipes(new ValidationPipe())
  @Put("/:id")
  async changeAlbum(@Body() body: AlbumDto , @Param("id", ParseUUIDPipe) id: string): Promise<AlbumDto> {
    return this.albumService.updateAlbum(body, id);
  };

  @Delete("/:id")
  async deleteAlbum(@Param("id", ParseUUIDPipe) id: string): Promise<HttpException> {
    return this.albumService.deleteAlbum(id);
  };


}
