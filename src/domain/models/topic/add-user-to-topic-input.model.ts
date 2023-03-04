export class AddUserToTopicInputModel {
  userId: number;
  topicId: number;

  constructor(partial: Partial<AddUserToTopicInputModel>) {
    Object.assign(this, partial);
  }
}
