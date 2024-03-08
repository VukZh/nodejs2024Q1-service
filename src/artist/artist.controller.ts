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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from '../dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<ArtistDto[]> {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  async getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<ArtistDto> {
    return this.artistService.getArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async addArtist(@Body() body: ArtistDto): Promise<ArtistDto> {
    return this.artistService.createArtist(body);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async changeArtist(
    @Body() body: ArtistDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistDto> {
    return this.artistService.updateArtist(body, id);
  }

  @Delete('/:id')
  async deleteArtist(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<HttpException> {
    return this.artistService.deleteArtist(id);
  }
}
