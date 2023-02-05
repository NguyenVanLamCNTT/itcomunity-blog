export class UpdateConfirmEmailUserResultModel {
  success: boolean;
  constructor(partial: Partial<UpdateConfirmEmailUserResultModel>) {
    Object.assign(this, partial);
  }
}
