export class CreateQuestionResultModel {
  success: boolean;
  constructor(partial: Partial<CreateQuestionResultModel>) {
    Object.assign(this, partial);
  }
}
