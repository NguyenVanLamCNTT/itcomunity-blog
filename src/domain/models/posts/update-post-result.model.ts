export class UpdatePostResultModel {
  success: boolean;

  constructor(partial: Partial<UpdatePostResultModel>) {
    Object.assign(this, partial);
  }
}
