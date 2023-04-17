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
  BookmarkSeriesRequestModel,
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
import { BaseFilterGetListModel } from 'src/presentation/models/base-filter-get-list.model';

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
  async getById(@Req() req: any, @Param('id') id: number) {
    const userId = req.user?.userId;
    return this.service.getById(id, userId);
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

  @Post('/bookmark')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: CreateSeriesResponseModel,
    isArray: false,
  })
  async bookmark(@Req() req: any, @Body() body: BookmarkSeriesRequestModel) {
    const userId = req.user['userId'];
    return await this.service.bookmark(userId, body);
  }

  @Get('/bookmark/user')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: GetAllSeriesResponseModel,
    isArray: false,
  })
  async getBookmark(
    @Req() req: any,
    @Query() pageable: BaseFilterGetListModel,
  ) {
    const userId = req.user['userId'];
    return this.service.getBookmark(userId, pageable);
  }
}
