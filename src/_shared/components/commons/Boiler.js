import React, { Component } from 'react';
import { Text } from 'react-native';

class Boiler extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#16a085',
      elevation: null,
    },
    headerLeft: null,
  };

  render() {
    return <Text>OLA</Text>;
  }
}

export { Boiler };
