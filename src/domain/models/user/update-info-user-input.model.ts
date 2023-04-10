export class UpdateInfoUserInputModel {
  id: number;
  fullname?: string;
  username?: string;
  password?: string;
  email?: string;
  age?: number;
  gender?: string;
  followersNumber?: number;
  postsNumber?: number;
  likesNumber?: number;
  avatar?: string;
  about?: string;
  followerIds?: number[];

  constructor(partial: Partial<UpdateInfoUserInputModel>) {
    Object.assign(this, partial);
  }
}
