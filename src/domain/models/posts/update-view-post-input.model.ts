export class UpdateViewPostInputModel {
  postId: number;
  constructor(partial: Partial<UpdateViewPostInputModel>) {
    Object.assign(this, partial);
  }
}
