import { Injectable } from '@nestjs/common';
import { AddCommentInputModel } from 'src/domain/models';
import { CommentDomainService } from 'src/domain/services';
import {
  AddCommentRequestModel,
  AddCommentResponseModel,
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
}
