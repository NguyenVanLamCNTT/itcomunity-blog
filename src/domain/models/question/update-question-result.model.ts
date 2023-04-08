export class UpdateQuestionResultModel {
  success: boolean;
  constructor(partial: Partial<UpdateQuestionResultModel>) {
    Object.assign(this, partial);
  }
}
