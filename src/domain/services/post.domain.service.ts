import { Injectable } from '@nestjs/common';
import { CreatePostCommand, RemovePostCommand } from '../commands';
import { CreatePostInputModel, RemovePostInputModel } from '../models';

@Injectable()
export class PostDomainService {
  constructor(
    private createPostCommand: CreatePostCommand,
    private removePostCommand: RemovePostCommand,
  ) {}

  async createPost(input: CreatePostInputModel): Promise<boolean> {
    const result = await this.createPostCommand.execute(input);
    return result.success;
  }

  async removePost(input: RemovePostInputModel): Promise<boolean> {
    const result = await this.removePostCommand.execute(input);
    return result.success;
  }
}
