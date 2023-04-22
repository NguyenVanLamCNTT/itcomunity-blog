import {
  AddCommentResultModel,
  UpdateCommentInputModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/infrastructure/database/repositories';

@Injectable({})
export class UpdateCommentCommand
  implements BaseCommand<UpdateCommentInputModel, AddCommentResultModel>
{
  constructor(private commentRepository: CommentRepository) {}
  async execute(
    input: UpdateCommentInputModel,
  ): Promise<AddCommentResultModel> {
    const entity = await this.commentRepository.findById(input.id);
    entity.content = input.content;
    await this.commentRepository.save(entity);
    return { success: true };
  }
}
