// const ROOT_URL = 'http://192.168.204.2:3000';
// const ROOT_URL = 'http://10.4.3.127:3000';

export const Actions = {
  LOGIN_PHONE_NUMBER_CHANGED: 'login_phone_number_changed',
  LOGIN_PIN_CHANGED: 'login_pin_changed',
  LOGIN_BUTTON_PRESSED: 'login_button_pressed',

  LOGIN_USER_SUCCESS: 'login_user_success',
  LOGIN_USER_FAILURE: 'login_user_failure',
  VERIFICATION_CODE_CHANGED: 'verification_code_changed',
};

export const loginPhoneNumberChanged = phone => ({
  type: Actions.LOGIN_PHONE_NUMBER_CHANGED,
  payload: phone,
});

export const loginPinChanged = pin => ({
  type: Actions.LOGIN_PIN_CHANGED,
  payload: pin,
});

export const verificationCodeChanged = code => ({
  type: Actions.VERIFICATION_CODE_CHANGED,
  payload: code,
});
