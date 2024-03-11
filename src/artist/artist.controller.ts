import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from '../dto/artist.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller('artist')
@ApiTags('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOkResponse({ status: 200, description: 'Artists received' })
  @Get()
  async getAllArtists(): Promise<ArtistDto[]> {
    return this.artistService.getAllArtists();
  }

  @ApiOkResponse({ status: 200, description: 'Artist is retrieved by his id' })
  @ApiBadRequestResponse({ status: 400, description: 'Artist`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Artist doesn`t exist' })
  @Get('/:id')
  async getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<ArtistDto> {
    return this.artistService.getArtist(id);
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Artist created',
    type: ArtistDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Artist`s body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async addArtist(@Body() body: ArtistDto): Promise<ArtistDto> {
    return this.artistService.createArtist(body);
  }

  @ApiOkResponse({ status: 200, description: 'Artist updated' })
  @ApiBadRequestResponse({ status: 400, description: 'Artist`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Artist doesn`t exist' })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async changeArtist(
    @Body() body: ArtistDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistDto> {
    return this.artistService.updateArtist(body, id);
  }

  @ApiResponse({ status: 204, description: 'Artist deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Artist`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Artist doesn`t exist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}
