export class CreatePostInputModel {
  keywords: string[];
  content: string;
  userId: number;
  imageUrl: string;
  name: string;
  status: string;
  topics: number[];

  constructor(partial: Partial<CreatePostInputModel>) {
    Object.assign(this, partial);
  }
}
