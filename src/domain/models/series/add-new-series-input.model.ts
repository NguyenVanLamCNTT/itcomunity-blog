export class AddNewSeriesInputModel {
  name: string;
  keywords: string[];
  description: string;
  status: string;
  userId: number;
  postIds: number[];

  constructor(partial: Partial<AddNewSeriesInputModel>) {
    Object.assign(this, partial);
  }
}
