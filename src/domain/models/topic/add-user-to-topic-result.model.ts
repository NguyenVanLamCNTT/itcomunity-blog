export class AddUserToTopicResultModel {
  success: boolean;

  constructor(partial: Partial<AddUserToTopicResultModel>) {
    Object.assign(this, partial);
  }
}
