import { Injectable } from '@nestjs/common';
import { CreatePostCommand } from '../commands';
import { CreatePostInputModel } from '../models';

@Injectable()
export class PostDomainService {
  constructor(private createPostCommand: CreatePostCommand) {}

  async createPost(input: CreatePostInputModel): Promise<boolean> {
    const result = await this.createPostCommand.execute(input);
    return result.success;
  }
}
