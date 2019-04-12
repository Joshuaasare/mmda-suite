/* @flow */
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {
  Header, Container, Center, Spinner,
} from '../_shared/components/commons';

type Props = {};
type State = {
  showSpinner: boolean,
};
class App extends Component<Props, State> {
  state = {
    showSpinner: false,
  };

  renderContent() {
    const { showSpinner } = this.state;
    if (showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return <View style={styles.box} />;
  }

  render() {
    return (
      <Container>
        <Header />
        <View style={styles.container}>{this.renderContent()}</View>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  box: {
    height: 120,
    width: '100%',
    margin: 10,
    elevation: 2,
    backgroundColor: 'yellow',
  },
};

export default App;
