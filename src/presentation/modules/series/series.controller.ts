import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateSeriesRequestModel,
  CreateSeriesResponseModel,
} from 'src/presentation/models';
import { JwtAuthGuard } from '../auth/auth.guard';
import { SeriesService } from './series.service';

@ApiBearerAuth()
@ApiTags('api/series')
@Controller('api/series')
export class SeriesController {
  constructor(private service: SeriesService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: CreateSeriesResponseModel,
    isArray: false,
  })
  async create(@Body() body: CreateSeriesRequestModel, @Req() req: any) {
    const userId = req.user['userId'];
    return await this.service.create(body, userId);
  }
}
