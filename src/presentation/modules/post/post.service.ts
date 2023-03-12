import { Injectable } from '@nestjs/common';
import { CreatePostInputModel, RemovePostInputModel } from 'src/domain/models';
import { PostDomainService } from 'src/domain/services';
import {
  CreatePostRequestModel,
  CreatePostResponseModel,
  GetAllPostRequestModel,
  GetAllPostResponseModel,
  GetDetailPostResponseModel,
  PostResponse,
  RemovePostResponseModel,
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
        topics: requestModel.topics,
        status: requestModel.status,
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

  async getAll(pageable: GetAllPostRequestModel) {
    const data = await this.postDomainService.findAll(pageable);
    return new GetAllPostResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
        items: data.items.map((item) => {
          return new PostResponse({
            ...item,
          });
        }),
      },
    });
  }

  async getById(id: number) {
    const data = await this.postDomainService.findById(id);
    return new GetDetailPostResponseModel({
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

  async getAllByUserFollow(pageable: GetAllPostRequestModel, userId: number) {
    const data = await this.postDomainService.findByUserFollowTopic(
      pageable,
      userId,
    );
    return new GetAllPostResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
        items: data.items.map((item) => {
          return new PostResponse({
            ...item,
          });
        }),
      },
    });
  }
}
