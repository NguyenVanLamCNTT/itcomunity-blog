import { Injectable } from '@nestjs/common';
import { AddCommentCommand } from '../commands';
import { AddCommentInputModel } from '../models';

@Injectable()
export class CommentDomainService {
  constructor(private addCommentCommand: AddCommentCommand) {}

  async create(model: AddCommentInputModel) {
    return await this.addCommentCommand.execute(model);
  }
}
