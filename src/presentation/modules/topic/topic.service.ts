import { Injectable } from '@nestjs/common';
import { TopicDomainService } from 'src/domain/services';
import {
  AddTopicToUserRequestModel,
  AddTopicToUserResponseMode,
  GetAllPostResponseModel,
  GetAllTopicRequestModel,
  GetAllTopicResponseModel,
  TopicResponseModel,
} from 'src/presentation/models';
import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class TopicService {
  constructor(private topicDomainService: TopicDomainService) {}

  async getAll(requestModel: GetAllTopicRequestModel) {
    const data = await this.topicDomainService.findAll(
      requestModel.page,
      requestModel.perPage,
      requestModel.sort,
    );
    return new GetAllTopicResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
        items: data.items.map((item) => {
          return new TopicResponseModel({ ...item });
        }),
      },
    });
  }

  async addUserToTopic(
    requestModel: AddTopicToUserRequestModel,
    userId: number,
  ) {
    const result = await this.topicDomainService.addUserToTopic({
      topicId: requestModel.topicId,
      userId,
    });

    return new AddTopicToUserResponseMode({
      id: RequestCorrelation.getRequestId(),
      data: { success: result.success },
    });
  }
}
