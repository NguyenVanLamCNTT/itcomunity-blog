import { Injectable } from '@nestjs/common';
import { BookmarkDomainService } from 'src/domain/services';
import { SeriesDomainService } from 'src/domain/services/series.domain.service';
import {
  BookmarkSeriesRequestModel,
  CreateSeriesRequestModel,
  CreateSeriesResponseModel,
  GetAllSeriesRequestModel,
  GetAllSeriesResponseModel,
  GetDetailSeriesResponseModel,
  RemovePostResponseModel,
  SeriesResponse,
  UpdatePostFromSeriesRequestModel,
  UpdateSeriesRequestModel,
} from 'src/presentation/models';
import { BaseFilterGetListModel } from 'src/presentation/models/base-filter-get-list.model';

import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class SeriesService {
  constructor(
    private seriesDomainService: SeriesDomainService,
    private bookmarkDomainService: BookmarkDomainService,
  ) {}

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
      pageable.isDeleted,
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

  async getById(id: number, userId: number) {
    let isBookmark = false;
    if (userId) {
      isBookmark = await this.bookmarkDomainService.isBookmarkSeries(
        userId,
        id,
      );
    }
    const data = await this.seriesDomainService.getId(id);
    return new GetDetailSeriesResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        ...data,
        isBookmark,
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

  async getBookmark(userId: number, req: BaseFilterGetListModel) {
    const data = await this.bookmarkDomainService.getSeriesBookmarkByUser(
      req.page,
      req.perPage,
      req.sort,
      userId,
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
            ...item.series,
            author: {
              id: item.series.author.id,
              avatar: item.series.author.avatar,
              fullName: item.series.author.fullName,
              username: item.series.author.username,
            },
          });
        }),
      },
    });
  }

  async bookmark(userId: number, req: BookmarkSeriesRequestModel) {
    const result = await this.bookmarkDomainService.updateBookmark({
      bookmark: req.bookmark,
      seriesId: req.seriesId,
      userId,
    });

    return new CreateSeriesResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: result,
    });
  }

  async remove(id: number) {
    const data = await this.seriesDomainService.remove(id);
    return new RemovePostResponseModel({
      id: RequestCorrelation.getRequestId(),
      data,
    });
  }
}
