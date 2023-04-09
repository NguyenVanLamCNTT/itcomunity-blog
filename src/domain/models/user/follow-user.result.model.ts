export class FollowUserResultModel {
  success: boolean;

  constructor(partial: Partial<FollowUserResultModel>) {
    Object.assign(this, partial);
  }
}
