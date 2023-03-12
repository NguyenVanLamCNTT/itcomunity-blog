import { Injectable } from '@nestjs/common';
import { SeriesDomainService } from 'src/domain/services/series.domain.service';
import {
  CreateSeriesRequestModel,
  CreateSeriesResponseModel,
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
}
