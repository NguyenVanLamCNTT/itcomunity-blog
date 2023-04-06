export class CreateAnswerResultModel {
  success: boolean;

  constructor(partial: Partial<CreateAnswerResultModel>) {
    Object.assign(this, partial);
  }
}
