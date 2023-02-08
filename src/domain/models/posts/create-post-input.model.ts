export class CreatePostInputModel {
  keywords: string[];
  content: string;
  userId: number;
  imageUrl: string;
  name: string;

  constructor(partial: Partial<CreatePostInputModel>) {
    Object.assign(this, partial);
  }
}
