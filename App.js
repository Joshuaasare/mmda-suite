/* @flow */

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  Container, Header, CircularButton, Button,
} from './src/_shared/components/commons';
import { constants } from './src/_shared/constants';

type Props = {};
type State = {};
class App extends Component<Props, State> {
  state = {};

  renderContent() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.circularImageView}>
            <CircularButton imageUrl={constants.misc.RANDOM_IMAGE_URL} borderRadius={60} />
          </View>
          <View style={styles.textViewStyle}>
            <Text>Obiri Dan Ventures</Text>
            <Text style={styles.amount}>GHS 1.00</Text>
          </View>

          <View style={styles.buttonsViewStyle}>
            <View style={styles.btn}>
              <Button
                buttonColor="green"
                borderColor="green"
                buttonText="Confirm"
                textColor="white"
                rounded
              />
            </View>

            <View style={styles.btn}>
              <Button
                buttonColor="maroon"
                borderColor="maroon"
                buttonText="Defer"
                textColor="white"
                rounded
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <Container>
        <Header />
        {this.renderContent()}
      </Container>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 20,
    alignItems: 'center',
    elevation: 2,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  circularImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textViewStyle: {
    marginVertical: 2,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsViewStyle: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  amount: {
    color: 'maroon',
    fontWeight: 'bold',
  },
};

export default App;
