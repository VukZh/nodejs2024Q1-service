import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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

  @Get(":/id")
  async getAlbum(@Param("id") id: string): Promise<AlbumDto> {
    return this.albumService.getAlbum(id);
  };

  @Post()
  async addAlbum(@Body() body: AlbumDto ): Promise<AlbumDto> {
    return this.albumService.createTrack(body);
  };

  @Put(":/id")
  async changeAlbum(@Body() body: AlbumDto , @Param("id") id: string): Promise<AlbumDto> {
    return this.albumService.updateAlbum(body, id);
  };

  @Delete(":/id")
  async deleteAlbum(@Param("id") id: string): Promise<boolean> {
    return this.albumService.deleteAlbum(id);
  };


}
