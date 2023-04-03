import { Injectable } from '@nestjs/common';
import { AddCommentInputModel } from 'src/domain/models';
import { CommentDomainService } from 'src/domain/services';
import {
  AddCommentRequestModel,
  AddCommentResponseModel,
  GetAllCommentModel,
  GetAllCommentRequestModel,
  GetAllCommentResponseData,
  GetAllCommentResponseModel,
} from 'src/presentation/models';
import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class CommentService {
  constructor(private commentDomainService: CommentDomainService) {}

  async create(request: AddCommentRequestModel, userId: number) {
    const result = await this.commentDomainService.create(
      new AddCommentInputModel({
        ...request,
        userId,
      }),
    );

    return new AddCommentResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: result.success },
    });
  }

  async getByPostId(postId: number, pageable: GetAllCommentRequestModel) {
    const data = await this.commentDomainService.getByPostId(
      postId,
      pageable.page,
      pageable.perPage,
    );

    return new GetAllCommentResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: new GetAllCommentResponseData({
        items: data.items.map(
          (item) =>
            new GetAllCommentModel({
              id: item.id,
              content: item.content,
              reportNumber: item.reportNumber,
              author: {
                id: item.author.id,
                avatar: item.author.avatar,
                fullname: item.author.fullName,
                username: item.author.username,
              },
              childComment: item.childComment.map(
                (i) =>
                  new GetAllCommentModel({
                    id: i.id,
                    content: i.content,
                    reportNumber: i.reportNumber,
                    author: {
                      id: i.author.id,
                      avatar: i.author.avatar,
                      fullname: i.author.fullName,
                      username: i.author.username,
                    },
                  }),
              ),
            }),
        ),
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
      }),
    });
  }

  async getBySeriesId(seriesId: number, pageable: GetAllCommentRequestModel) {
    const data = await this.commentDomainService.getBySeriesId(
      seriesId,
      pageable.page,
      pageable.perPage,
    );

    return new GetAllCommentResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: new GetAllCommentResponseData({
        items: data.items.map(
          (item) =>
            new GetAllCommentModel({
              id: item.id,
              content: item.content,
              reportNumber: item.reportNumber,
              author: {
                id: item.author.id,
                avatar: item.author.avatar,
                fullname: item.author.fullName,
                username: item.author.username,
              },
              childComment: item.childComment.map(
                (i) =>
                  new GetAllCommentModel({
                    id: i.id,
                    content: i.content,
                    reportNumber: i.reportNumber,
                    author: {
                      id: i.author.id,
                      avatar: i.author.avatar,
                      fullname: i.author.fullName,
                      username: i.author.username,
                    },
                  }),
              ),
            }),
        ),
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
      }),
    });
  }
}
