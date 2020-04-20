/**
 * @Author: joshuaasare
 * @Date:   2018-12-18 20:51:25
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 16:56:17
 */

import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Modal,
} from 'react-native';
import {
  Container, CircularButton, Header, Icon, Button,
} from './src/_shared/components/commons';
import { constants } from './src/_shared/constants';

type Props = {};
type State = {
  modalVisible: boolean,
};

class App extends Component<Props, State> {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <Container>
        <Header />
        <Button buttonColor="maroon" onPress={() => this.setState({ modalVisible: true })} />
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
          transparent
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalTop}>
                <Text>Please review and proceed</Text>
                <View style={styles.iconView}>
                  <Icon name="ios-close" size={25} />
                </View>
              </View>
              <View style={styles.outstandingBox}>
                <Text>Outstanding</Text>
                <Text>Hello</Text>
              </View>
              <View style={styles.outstandingBox}>
                <Text>Outstanding</Text>
                <Text>Hello</Text>
              </View>
              <View style={styles.outstandingBox}>
                <Text>Outstanding</Text>
                <Text>Hello</Text>
              </View>
              <Button buttonColor="green" onPress={() => this.setState({ modalVisible: false })} />
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}
const styles = {
  modalOverlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '80%',
    height: 250,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  outstandingBox: {
    height: 40,
    width: '90%',
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 3,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 3,
  },
  modalTop: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 5,
    width: '90%',
  },
  iconView: {
    flex: 1,
    alignItems: 'flex-end',
  },
};

export default App;
