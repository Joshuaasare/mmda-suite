import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../_shared/reducers';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

export default store;
