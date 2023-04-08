export class UpdateSeriesResultModel {
  success: boolean;

  constructor(partial: Partial<UpdateSeriesResultModel>) {
    Object.assign(this, partial);
  }
}
