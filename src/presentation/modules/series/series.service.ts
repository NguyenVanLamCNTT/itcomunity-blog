import { Injectable } from '@nestjs/common';
import { SeriesDomainService } from 'src/domain/services/series.domain.service';
import {
  CreateSeriesRequestModel,
  CreateSeriesResponseModel,
} from 'src/presentation/models';
import {
  GetAllSeriesResponseModel,
  SeriesResponse,
} from 'src/presentation/models/series/get-all-series-reponse.model';
import { GetAllSeriesRequestModel } from 'src/presentation/models/series/get-all-series-request.model';
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
}
