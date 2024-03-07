import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { ArtistDto } from "../dto/artist.dto";

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {
  }

  @Get()
  async getAllArtists(): Promise<ArtistDto[]> {
    return this.artistService.getAllArtists();
  };

  @Get(":/id")
  async getArtist(@Param("id") id: string): Promise<ArtistDto> {
    return this.artistService.getArtist(id);
  };

  @Post()
  async addArtist(@Body() body: ArtistDto ): Promise<ArtistDto> {
    return this.artistService.createArtist(body);
  };

  @Put(":/id")
  async changeArtist(@Body() body: ArtistDto , @Param("id") id: string): Promise<ArtistDto> {
    return this.artistService.updateArtist(body, id);
  };

  @Delete(":/id")
  async deleteArtist(@Param("id") id: string): Promise<boolean> {
    return this.artistService.deleteArtist(id);
  };
}
