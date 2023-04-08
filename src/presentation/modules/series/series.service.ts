import { Injectable } from '@nestjs/common';
import { SeriesDomainService } from 'src/domain/services/series.domain.service';
import {
  CreateSeriesRequestModel,
  CreateSeriesResponseModel,
  GetAllSeriesRequestModel,
  GetAllSeriesResponseModel,
  GetDetailSeriesResponseModel,
  SeriesResponse,
  UpdatePostFromSeriesRequestModel,
  UpdateSeriesRequestModel,
} from 'src/presentation/models';

import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class SeriesService {
  constructor(private seriesDomainService: SeriesDomainService) {}

  async create(request: CreateSeriesRequestModel, userId: number) {
    const result = await this.seriesDomainService.create({
      ...request,
      userId,
    });

    return new CreateSeriesResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: result },
    });
  }

  async getAll(pageable: GetAllSeriesRequestModel) {
    const data = await this.seriesDomainService.getAll(
      pageable.page,
      pageable.perPage,
      pageable.sort,
      pageable.username,
    );

    return new GetAllSeriesResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
        items: data.items.map((item) => {
          return new SeriesResponse({
            ...item,
          });
        }),
      },
    });
  }

  async getById(id: number) {
    const data = await this.seriesDomainService.getId(id);
    return new GetDetailSeriesResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        ...data,
        author: {
          id: data.author.id,
          avatar: data.author.avatar,
          email: data.author.email,
          followersNumber: data.author.followersNumber,
          fullName: data.author.fullName,
          gender: data.author.gender,
          likesNumber: data.author.likesNumber,
          postsNumber: data.author.postsNumber,
          username: data.author.username,
        },
      },
    });
  }

  async getByUser(userId: number, pageable: GetAllSeriesRequestModel) {
    const data = await this.seriesDomainService.getByUser(
      userId,
      pageable.page,
      pageable.perPage,
      pageable.sort,
    );

    return new GetAllSeriesResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
        items: data.items.map((item) => {
          return new SeriesResponse({
            ...item,
          });
        }),
      },
    });
  }

  async update(seriesId: number, body: UpdateSeriesRequestModel) {
    const data = await this.seriesDomainService.updateSeries({
      title: body.name,
      seriesId,
      ...body,
    });

    return new CreateSeriesResponseModel({
      id: RequestCorrelation.getRequestId(),
      data,
    });
  }

  async updatePostFromSeries(
    seriesId: number,
    body: UpdatePostFromSeriesRequestModel,
  ) {
    const data = await this.seriesDomainService.updatePostFromSeries({
      seriesId,
      ...body,
    });

    return new CreateSeriesResponseModel({
      id: RequestCorrelation.getRequestId(),
      data,
    });
  }
}
