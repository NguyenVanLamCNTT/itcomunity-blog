export class CreateQuestionInputModel {
  title: string;
  content: string;
  keywords: string[];
  userId: number;

  constructor(partial: Partial<CreateQuestionInputModel>) {
    Object.assign(this, partial);
  }
}
