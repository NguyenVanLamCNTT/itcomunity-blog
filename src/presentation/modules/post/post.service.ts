import { Injectable } from '@nestjs/common';
import { CreatePostInputModel, RemovePostInputModel } from 'src/domain/models';
import { PostDomainService } from 'src/domain/services';
import {
  CreatePostRequestModel,
  CreatePostResponseModel,
} from 'src/presentation/models';
import { RemovePostResponseModel } from 'src/presentation/models/post/remove-post-response.model';
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

  async delete(postId: number) {
    const result = await this.postDomainService.removePost(
      new RemovePostInputModel({ postId }),
    );

    return new RemovePostResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: result },
    });
  }
}
