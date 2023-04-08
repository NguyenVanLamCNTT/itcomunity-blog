import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateSeriesRequestModel,
  CreateSeriesResponseModel,
  GetDetailSeriesResponseModel,
  UpdatePostFromSeriesRequestModel,
  UpdateSeriesRequestModel,
} from 'src/presentation/models';
import { GetAllSeriesResponseModel } from 'src/presentation/models/series/get-all-series-reponse.model';
import { GetAllSeriesRequestModel } from 'src/presentation/models/series/get-all-series-request.model';
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

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllSeriesResponseModel,
    isArray: false,
  })
  async getAll(@Query() pageable: GetAllSeriesRequestModel) {
    return this.service.getAll(pageable);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetDetailSeriesResponseModel,
    isArray: false,
  })
  @ApiParam({ name: 'id', required: true })
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Get('me/author')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: GetAllSeriesResponseModel,
    isArray: false,
  })
  async getByUser(@Req() req: any, @Query() query: GetAllSeriesRequestModel) {
    const userId = req.user['userId'];
    return this.service.getByUser(userId, query);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: CreateSeriesResponseModel,
    isArray: false,
  })
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param('id') id: number,
    @Body() body: UpdateSeriesRequestModel,
  ) {
    return this.service.update(id, body);
  }

  @Patch(':id/update-post')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: CreateSeriesResponseModel,
    isArray: false,
  })
  @ApiParam({ name: 'id', required: true })
  async updatePostFromSeries(
    @Param('id') id: number,
    @Body() body: UpdatePostFromSeriesRequestModel,
  ) {
    return this.service.updatePostFromSeries(id, body);
  }
}
