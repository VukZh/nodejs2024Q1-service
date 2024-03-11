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

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<AlbumDto[]> {
    return this.albumService.getAllAlbums();
  }

  @Get('/:id')
  async getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<AlbumDto> {
    return this.albumService.getAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createAlbum(@Body() body: AlbumDto): Promise<AlbumDto> {
    return this.albumService.createAlbum(body);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async changeAlbum(
    @Body() body: AlbumDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumDto> {
    return this.albumService.updateAlbum(body, id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}
