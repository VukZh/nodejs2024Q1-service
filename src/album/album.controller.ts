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
import { AlbumService } from './album.service';
import { AlbumDto } from '../dto/album.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller('album')
@ApiTags('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOkResponse({ status: 200, description: 'Albums received' })
  @Get()
  async getAllAlbums(): Promise<AlbumDto[]> {
    return await this.albumService.getAllAlbums();
  }

  @ApiOkResponse({ status: 200, description: 'Album is retrieved by his id' })
  @ApiBadRequestResponse({ status: 400, description: 'Album`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Album doesn`t exist' })
  @Get('/:id')
  async getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<AlbumDto> {
    return await this.albumService.getAlbum(id);
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Album created',
    type: AlbumDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Album`s body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async createAlbum(@Body() body: AlbumDto): Promise<AlbumDto> {
    return await this.albumService.createAlbum(body);
  }

  @ApiOkResponse({ status: 200, description: 'Album updated' })
  @ApiBadRequestResponse({ status: 400, description: 'Album`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Album doesn`t exist' })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async changeAlbum(
    @Body() body: AlbumDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumDto> {
    return await this.albumService.updateAlbum(body, id);
  }

  @ApiResponse({ status: 204, description: 'Album deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Album`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Album doesn`t exist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.albumService.deleteAlbum(id);
  }
}
