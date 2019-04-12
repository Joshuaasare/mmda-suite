import { Actions } from './auth_actions';
import initialStoreState from '../../_shared/initialStoreState';

export default (state = initialStoreState.auth, action) => {
  switch (action.type) {
    case Actions.LOGIN_PHONE_NUMBER_CHANGED:
      return { ...state, loginPhone: action.payload };
    case Actions.LOGIN_PIN_CHANGED:
      return { ...state, loginPin: action.payload };
    case Actions.LOGIN_USER_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case Actions.VERIFICATION_CODE_CHANGED:
      return { ...state, code: action.payload };

    default:
      return state;
  }
};
