export class UpdateConfirmEmailUserInputModel {
  email: string;
  constructor(partial: Partial<UpdateConfirmEmailUserInputModel>) {
    Object.assign(this, partial);
  }
}
