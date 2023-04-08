export class UpdateViewQuestionResultModel {
  success: boolean;
  constructor(partial: Partial<UpdateViewQuestionResultModel>) {
    Object.assign(this, partial);
  }
}
