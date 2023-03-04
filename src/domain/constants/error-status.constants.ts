export class ErrorStatusConstants {
  //400 Bad request
  public static GENDER_NOT_EXIST = '400001';
  public static OTP_INVALID = '400002';
  //403 Forbidden
  public static INCORRECT_PASSWORD = '403001';
  public static USER_HAS_NOT_CONFIRMED_EMAIL = '403002';
  //404 Not found
  public static USER_NOT_EXIST = '404001';
  public static POST_NOT_EXIST = '404002';
  public static TOPIC_NOT_EXIST = '404003';
  //409 Conflict
  public static EMAIL_EXIST = '409001';
}
