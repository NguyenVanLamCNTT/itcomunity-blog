export class AddCommentResultModel {
  success: boolean;

  constructor(partial: Partial<AddCommentResultModel>) {
    Object.assign(this, partial);
  }
}
