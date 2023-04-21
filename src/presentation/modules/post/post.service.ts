import { Injectable } from '@nestjs/common';
import { CreatePostInputModel, RemovePostInputModel } from 'src/domain/models';
import { BookmarkDomainService, PostDomainService } from 'src/domain/services';
import { GPTUtil } from 'src/infrastructure/utilities';
import {
  BookmarkPostRequestModel,
  CreatePostRequestModel,
  CreatePostResponseModel,
  CreatePostWithChatGPTRequestModel,
  CreatePostWithChatGPTResponseModel,
  GetAllPostRequestModel,
  GetAllPostResponseModel,
  GetDetailPostResponseModel,
  GetPostByUsernameRequestModel,
  PostResponse,
  RemovePostResponseModel,
  UpdatePostRequestModel,
  UpdateViewPostRequestModel,
  UpdateViewPostResponseModel,
} from 'src/presentation/models';
import { BaseFilterGetListModel } from 'src/presentation/models/base-filter-get-list.model';
import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class PostService {
  constructor(
    private postDomainService: PostDomainService,
    private gptUtil: GPTUtil,
    private bookmarkDomainService: BookmarkDomainService,
  ) {}

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
          delete item.topicPost;
          return new PostResponse({
            ...item,
            author: {
              id: item.author.id,
              avatar: item.author.avatar,
              fullName: item.author.fullName,
              username: item.author.username,
            },
          });
        }),
      },
    });
  }

  async getById(id: number, userId?: number) {
    let isBookmark = false;
    if (userId) {
      isBookmark = await this.bookmarkDomainService.isBookmarkPost(userId, id);
    }
    const data = await this.postDomainService.findById(id);

    return new GetDetailPostResponseModel({
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
          delete item.topicPost;
          return new PostResponse({
            ...item,
            author: {
              id: item.author.id,
              avatar: item.author.avatar,
              fullName: item.author.fullName,
              username: item.author.username,
            },
          });
        }),
      },
    });
  }

  async getAllBySeries(seriesId: number, pageable: GetAllPostRequestModel) {
    const data = await this.postDomainService.findBySeries(
      seriesId,
      pageable.page,
      pageable.perPage,
      pageable.sort,
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
            author: {
              id: item.author.id,
              avatar: item.author.avatar,
              fullName: item.author.fullName,
              username: item.author.username,
            },
          });
        }),
      },
    });
  }

  async createPostWithChatGPT(req: CreatePostWithChatGPTRequestModel) {
    const text = await this.gptUtil.getModelAnswer(req.question);
    return new CreatePostWithChatGPTResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { text: text },
    });
  }

  async getByUser(userId: number, pageable: GetAllPostRequestModel) {
    const data = await this.postDomainService.findByAuthor(
      userId,
      pageable.page,
      pageable.perPage,
      pageable.sort,
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
            author: {
              id: item.author.id,
              avatar: item.author.avatar,
              fullName: item.author.fullName,
              username: item.author.username,
            },
          });
        }),
      },
    });
  }

  async updateViewPost(body: UpdateViewPostRequestModel) {
    const data = await this.postDomainService.updateViewPost(body.postId);

    return new UpdateViewPostResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: data },
    });
  }

  async updatePost(postId: number, req: UpdatePostRequestModel) {
    const data = await this.postDomainService.updatePost({
      ...req,
      postId,
      title: req.name,
    });

    return new CreatePostResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: data,
    });
  }

  async bookmarkPost(userId: number, req: BookmarkPostRequestModel) {
    const result = await this.bookmarkDomainService.updateBookmark({
      bookmark: req.bookmark,
      userId,
      postId: req.postId,
    });

    return new CreatePostResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: result,
    });
  }

  async getPostBookmark(userId: number, req: BaseFilterGetListModel) {
    const data = await this.bookmarkDomainService.getPostBookmarkByUser(
      req.page,
      req.perPage,
      req.sort,
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
            ...item.post,
            author: {
              id: item.post.author.id,
              avatar: item.post.author.avatar,
              fullName: item.post.author.fullName,
              username: item.post.author.username,
            },
          });
        }),
      },
    });
  }

  async updateTrending() {
    await this.postDomainService.updateTrending();
    return { success: true };
  }

  async getTrending() {
    const data = await this.postDomainService.getTrending();
    return data.map((item) => {
      return new PostResponse({
        ...item,
        author: {
          id: item.author.id,
          avatar: item.author.avatar,
          fullName: item.author.fullName,
          username: item.author.username,
        },
      });
    });
  }
}
