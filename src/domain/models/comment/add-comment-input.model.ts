export class AddCommentInputModel {
  postId?: number;
  seriesId?: number;
  answerId?: number;
  parentCommentId?: number;
  userId: number;
  content: string;

  constructor(partial: Partial<AddCommentInputModel>) {
    Object.assign(this, partial);
  }
}
