import { Injectable } from '@nestjs/common';
import { CreateTopicInputModel } from 'src/domain/models';
import { TopicDomainService } from 'src/domain/services';
import {
  AddTopicToUserRequestModel,
  AddTopicToUserResponseMode,
  CreateTopicRequestModel,
  CreateTopicResponseModel,
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
      requestModel.search,
      requestModel.isDeleted,
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

  async create(request: CreateTopicRequestModel) {
    const result = await this.topicDomainService.create(
      new CreateTopicInputModel({ name: request.name, image: request.image }),
    );
    return new CreateTopicResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: true },
    });
  }

  async removeUserToTopic(
    requestModel: AddTopicToUserRequestModel,
    userId: number,
  ) {
    const result = await this.topicDomainService.removeUserToTopic({
      topicId: requestModel.topicId,
      userId,
    });
    return new AddTopicToUserResponseMode({
      id: RequestCorrelation.getRequestId(),
      data: { success: result.success },
    });
  }

  async removeTopic(id: number) {
    const result = await this.topicDomainService.remove(id);
    return new AddTopicToUserResponseMode({
      id: RequestCorrelation.getRequestId(),
      data: { success: result.success },
    });
  }
}
