export class RemovePostInputModel {
  postId: number;

  constructor(partial: Partial<RemovePostInputModel>) {
    Object.assign(this, partial);
  }
}
