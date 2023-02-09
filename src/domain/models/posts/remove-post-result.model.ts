export class RemovePostResult {
  success: boolean;

  constructor(partial: Partial<RemovePostResult>) {
    Object.assign(this, partial);
  }
}
