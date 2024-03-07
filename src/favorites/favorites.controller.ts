import { Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";

import { FavoritesService } from "./favorites.service";
import { FavoritesDto } from "../dto/favorites.dto";

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {
  }

  @Get()
  async getFavorites(): Promise<FavoritesDto> {
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

  @Delete("/:id")
  async deleteTrack(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.deleteTrack(id);
  };

  @Delete("/:id")
  async deleteAlbum(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.deleteAlbum(id);
  };

  @Delete("/:id")
  async deleteArtist(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.deleteArtist(id);
  };
}
