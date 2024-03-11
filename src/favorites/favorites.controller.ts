import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from '../dto/favorites.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller('favs')
@ApiTags('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOkResponse({ status: 200, description: 'Albums received' })
  @Get()
  async getFavorites(): Promise<FavoritesResponse> {
    return this.favoritesService.getFavorites();
  }

  @ApiResponse({ status: 201, description: 'Track add to the favorites' })
  @ApiBadRequestResponse({ status: 400, description: 'Track`s ID is invalid' })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Track`s ID doesn"t exist',
  })
  @Post('track/:id')
  async addTrackToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.addTrackToFavs(id);
  }

  @ApiResponse({ status: 201, description: 'Album add to the favorites' })
  @ApiBadRequestResponse({ status: 400, description: 'Album`s ID is invalid' })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Album`s ID doesn"t exist',
  })
  @Post('album/:id')
  async addAlbumToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.addAlbumToFavs(id);
  }

  @ApiResponse({ status: 201, description: 'Artist add to the favorites' })
  @ApiBadRequestResponse({ status: 400, description: 'Artist`s ID is invalid' })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Artist`s ID doesn"t exist',
  })
  @Post('artist/:id')
  async addArtistToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.addArtistToFavs(id);
  }

  @ApiResponse({ status: 204, description: 'Track deleted from the favorites' })
  @ApiBadRequestResponse({ status: 400, description: 'Track`s ID is invalid' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Track`s ID doesn"t exist in the favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async deleteTrackFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    console.log('000 ', id);
    return this.favoritesService.deleteTrackFromFavs(id);
  }

  @ApiResponse({ status: 204, description: 'Album deleted from the favorites' })
  @ApiBadRequestResponse({ status: 400, description: 'Album`s ID is invalid' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Album`s ID doesn"t exist in the favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async deleteAlbumFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteAlbumFromFavs(id);
  }

  @ApiResponse({
    status: 204,
    description: 'Artist deleted from the favorites',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Artist`s ID is invalid' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Artist`s ID doesn"t exist in the favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async deleteArtistFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteArtistFromFavs(id);
  }
}
