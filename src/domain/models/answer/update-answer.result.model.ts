export class UpdateAnswerResultModel {
  success: boolean;

  constructor(partial: Partial<UpdateAnswerResultModel>) {
    Object.assign(this, partial);
  }
}
