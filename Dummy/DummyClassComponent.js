import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from '../src/_shared/components/commons';

type Props = {};
type State = {};
class App extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Container>
        <View style={styles.cameraContainer}>
          <Text>Hello</Text>
        </View>
      </Container>
    );
  }
}
const styles = {
  cameraContainer: {
    flex: 1,
  },
};

export default App;
