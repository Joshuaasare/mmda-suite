import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Container, CircularButton, Header, Icon,
} from './src/_shared/components/commons';
import { constants } from './src/_shared/constants';

type Props = {};
type State = {};
class App extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Container>
        <Header />
      </Container>
    );
  }
}
const styles = {};

export default App;
