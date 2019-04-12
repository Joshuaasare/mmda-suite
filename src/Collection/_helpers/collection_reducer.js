import { Actions } from './collection_action';
import initialStoreState from '../../_shared/initialStoreState';

export default (state = initialStoreState.collection.direction, action) => {
  switch (action.type) {
    case Actions.ON_MAP_READY:
      return {
        ...state,
        directionResults: action.payload.result,
        width: action.payload.deviceWidth,
        mode: action.payload.mode,
        modeLoading: false,
      };
    case Actions.RESET_WIDTH:
      return { ...state, width: action.payload };
    case Actions.TRAVEL_MODE_CHANGED:
      return { ...state, mode: action.payload, modeLoading: true };
    default:
      return state;
  }
};
