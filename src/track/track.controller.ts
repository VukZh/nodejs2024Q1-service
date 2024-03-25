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
import { TrackService } from './track.service';
import { TrackDto } from '../dto/track.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller('track')
@ApiTags('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOkResponse({ status: 200, description: 'Tracks received' })
  @Get()
  async getAllTracks(): Promise<TrackDto[]> {
    return await this.trackService.getAllTracks();
  }

  @ApiOkResponse({ status: 200, description: 'Track is retrieved by his id' })
  @ApiBadRequestResponse({ status: 400, description: 'Track`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Track doesn`t exist' })
  @Get('/:id')
  async getTrack(@Param('id', ParseUUIDPipe) id: string): Promise<TrackDto> {
    return await this.trackService.getTrack(id);
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Track created',
    type: TrackDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Track`s body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async addTrack(@Body() body: TrackDto): Promise<TrackDto> {
    return await this.trackService.createTrack(body);
  }

  @ApiOkResponse({ status: 200, description: 'Track updated' })
  @ApiBadRequestResponse({ status: 400, description: 'Track`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Track doesn`t exist' })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async changeTrack(
    @Body() body: TrackDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrackDto> {
    return await this.trackService.updateTrack(body, id);
  }

  @ApiOkResponse({ status: 204, description: 'Track deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Track`s ID is invalid' })
  @ApiNotFoundResponse({ status: 404, description: 'Track doesn`t exist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.trackService.deleteTrack(id);
  }
}
