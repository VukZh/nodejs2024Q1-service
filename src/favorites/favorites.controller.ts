import { Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";

import { FavoritesService } from "./favorites.service";
import { FavoritesDto, FavoritesResponse } from "../dto/favorites.dto";

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {
  }

  @Get()
  async getFavorites(): Promise<FavoritesResponse> {
    return this.favoritesService.getFavorites();
  };

  @Post("track/:id")
  async addTrack(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.addTrack(id);
  };

  @Post("album/:id")
  async addAlbum(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.addAlbum(id);
  };

  @Post("artist/:id")
  async addArtist(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.addArtist(id);
  };

  @Delete("track/:id")
  async deleteTrack(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    console.log("000 ", id);
    return this.favoritesService.deleteTrack(id);
  };

  @Delete("album/:id")
  async deleteAlbum(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.deleteAlbum(id);
  };

  @Delete("artist/:id")
  async deleteArtist(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.deleteArtist(id);
  };
}
