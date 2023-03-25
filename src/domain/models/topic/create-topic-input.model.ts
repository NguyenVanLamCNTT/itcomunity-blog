export class CreateTopicInputModel {
  name: string;
  image: string;

  constructor(partial: Partial<CreateTopicInputModel>) {
    Object.assign(this, partial);
  }
}
