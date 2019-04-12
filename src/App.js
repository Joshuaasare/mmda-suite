import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { Navigator } from './Navigator';
import store from './store';
// import { default as Dummy } from '../App';

YellowBox.ignoreWarnings(['Remote debugger', 'Debugger and device']);

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
