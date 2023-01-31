export class RegisterUserCommandResultModel {
  success: boolean;

  constructor(partial: Partial<RegisterUserCommandResultModel>) {
    Object.assign(this, partial);
  }
}
