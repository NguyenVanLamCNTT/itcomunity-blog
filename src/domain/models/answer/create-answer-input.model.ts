export class CreateAnswerInputModel {
  content: string;
  userId: number;
  questionId: number;

  constructor(partial: Partial<CreateAnswerInputModel>) {
    Object.assign(this, partial);
  }
}
