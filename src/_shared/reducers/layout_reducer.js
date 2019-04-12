import { Actions } from '../actions/layout_action';
import initialStoreState from '../initialStoreState';

export default (state = initialStoreState.layout, action) => {
  switch (action.type) {
    case Actions.LAYOUT_UPDATED:
      //  console.log(action.payload);
      return {
        ...state,
        newLayoutWidth: action.payload.width,
        newLayoutHeight: action.payload.height,
      };
    default:
      return state;
  }
};
