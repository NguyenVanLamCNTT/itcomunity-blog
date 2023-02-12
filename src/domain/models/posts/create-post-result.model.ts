export class CreatePostResultModel {
  success: boolean;

  constructor(partial: Partial<CreatePostResultModel>) {
    Object.assign(this, partial);
  }
}
