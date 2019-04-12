import { combineReducers } from 'redux';
import AuthReducer from '../../Auth/_helpers/auth_reducer';
import LayoutReducer from './layout_reducer';
import ProfileReducer from './profile_reducer';
import CollectionReducer from '../../Collection/_helpers/collection_reducer';

export default combineReducers({
  auth: AuthReducer,
  layout: LayoutReducer,
  profile: ProfileReducer,
  collection: CollectionReducer,
});
