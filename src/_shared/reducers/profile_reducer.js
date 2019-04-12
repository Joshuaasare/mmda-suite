import { Actions } from '../actions/profile_action';
import initialStoreState from '../initialStoreState';

export default (state = initialStoreState.profile, action) => {
  switch (action.type) {
    case Actions.LOAD_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
