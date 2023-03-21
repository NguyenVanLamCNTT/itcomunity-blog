export class CreateTopicResultModel {
  success: boolean;

  constructor(partial: Partial<CreateTopicResultModel>) {
    Object.assign(this, partial);
  }
}
