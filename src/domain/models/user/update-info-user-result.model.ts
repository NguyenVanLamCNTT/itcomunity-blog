export class UpdateInfoUserResultModel {
  success: boolean;

  constructor(partial: Partial<UpdateInfoUserResultModel>) {
    Object.assign(this, partial);
  }
}
