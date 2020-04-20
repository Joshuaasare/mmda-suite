import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Container, CircularButton, Header, Icon,
} from '../_shared/components/commons';
import { constants } from '../_shared/constants';

type Props = {};
type State = {};
class AddTrader extends Component<Props, State> {
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

export default AddTrader;
