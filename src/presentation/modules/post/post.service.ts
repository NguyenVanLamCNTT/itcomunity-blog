import { Injectable } from '@nestjs/common';
import { CreatePostInputModel } from 'src/domain/models';
import { PostDomainService } from 'src/domain/services';
import {
  CreatePostRequestModel,
  CreatePostResponseModel,
} from 'src/presentation/models';
import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class PostService {
  constructor(private postDomainService: PostDomainService) {}

  async create(requestModel: CreatePostRequestModel, userId: number) {
    const result = await this.postDomainService.createPost(
      new CreatePostInputModel({
        userId,
        content: requestModel.content,
        imageUrl: requestModel.imageUrl,
        keywords: requestModel.keywords,
        name: requestModel.name,
      }),
    );

    return new CreatePostResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: result },
    });
  }
}
