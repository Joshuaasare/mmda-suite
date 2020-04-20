import React from 'react';
import { YellowBox, View } from 'react-native';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { Navigator } from './Navigator';
import store from './store';
import { default as Dummy } from '../App';

YellowBox.ignoreWarnings(['Remote debugger', 'Debugger and device']);

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <Navigator />
      <FlashMessage position="bottom" duration={4000} />
    </View>
  </Provider>
);

export default App;
