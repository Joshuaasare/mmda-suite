export const constants = {
  auth: {
    HAS_LOGGED_IN: 'has_logged_in',
    HAS_COMPLETED_SETUP: 'has_completed_setup',
    USER_DATA: 'user_data',
    USER_PHONE_NUMBER: 'user_phone_number',
    USER_LOGIN_ATTEMPTS: 'user_login_attempts',
    NUMBER_OF_ATTEMPTS: '3',
  },
  api: {},
  subscribableEvents: {
    SHOPS_UPDATED: 'shops_updated',
  },
  shop: {
    SCANNED_FOR_TODAY: 'Scanned',
    NOT_SCANNED_FOR_TODAY: 'Not Scanned',
    PAID_FOR_TODAY: 'Paid',
    NOT_PAID_FOR_TODAY: 'Not Paid',
  },
  map: {},
  errorMessages: {
    LOCATION_PERMISSION_NOT_GRANTED:
      'You need to grant location permissions to Market toll to use this feature',
    POSITION_UNAVAILABLE:
      'We could not determine your position. Please try again!',
    REQUEST_TIMEOUT: 'Please check internet connection and try again',
    PLAY_SERVICES_UNAVAILABLE:
      'Google play services is not installed or out of date, please install and try again!',
    LOCATION_SERVICE_UNAVAILABLE:
      'Please turn on location services and try again',
    INTERNAL_CRASH: 'Oops, there seems to be a problem, Please try again',
    NO_LOCATION: 'Oops, the location for this shop has not been stored',
    CAMERA_SERVICE_UNAVAILABLE: 'Please turn on camera service to try again',
    CAMERA_PERMISSION_NOT_GRANTED:
      'You need to grant camera permissions to Market toll to use this feature',
  },
  misc: {
    RANDOM_IMAGE_URL:
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    RANDOM_IMAGE_URL2:
      'https://images.unsplash.com/photo-1542029001094-3396a824ba27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
  },
  layout: {
    MEDIUM_SCREEN_WIDTH: 420,
    LARGE_SCREEN_WIDTH: 720,
    EXTRA_LARGE_SCREEN_WIDTH: 1024,
  },
};


const personalize_msg = (Name, _ending = '.') => {
  const message = 'you are great';
  return `${Name}, ${message}${_ending}`;
};

personalize_msg('Anonymous', '!');
