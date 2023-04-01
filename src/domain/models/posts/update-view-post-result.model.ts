export class UpdateViewPostResultModel {
  success: boolean;
  constructor(partial: Partial<UpdateViewPostResultModel>) {
    Object.assign(this, partial);
  }
}
