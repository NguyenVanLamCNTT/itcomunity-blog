export class AddNewSeriesResultModel {
  success: boolean;

  constructor(partial: Partial<AddNewSeriesResultModel>) {
    Object.assign(this, partial);
  }
}
