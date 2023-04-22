import { RemoveInputModel, RemoveResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { CommentRepository } from 'src/infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable({})
export class RemoveCommentCommand
  implements BaseCommand<RemoveInputModel, RemoveResultModel>
{
  constructor(private commentRepository: CommentRepository) {}
  async execute(input: RemoveInputModel): Promise<RemoveResultModel> {
    const entity = await this.commentRepository.findById(input.id);
    entity.isDeleted = true;
    await this.commentRepository.save(entity);
    return { success: true };
  }
}
