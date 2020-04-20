/**
 * @Author: joshuaasare
 * @Date:   2019-04-21 01:00:34
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:00:59
 */

// @flow
import React from 'react';
import {
  View, Text, Modal, TouchableOpacity,
} from 'react-native';
import { Button, Icon } from '../_shared/components/commons';

type Props = {
  modalVisible: boolean,
  onRequestClose: () => void,
  onProceedButtonTapped: () => void,
  onCloseIconPressed: () => void,
};

const ConfirmModal = (props: Props) => (
  <Modal
    animationType="slide"
    visible={props.modalVisible}
    onRequestClose={props.onRequestClose}
    transparent
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>
        <View style={styles.modalTop}>
          <Text>Please review and proceed</Text>
          <TouchableOpacity style={styles.iconView} onPress={props.onCloseIconPressed}>
            <Icon name="ios-close" size={25} />
          </TouchableOpacity>
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
        <View style={styles.buttonsViewStyle}>
          <Button buttonColor="green" onPress={props.onProceedButtonTapped} />
        </View>
      </View>
    </View>
  </Modal>
);

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
  buttonsViewStyle: {
    paddingVertical: 10,
    width: '90%',
    flex: 1,
  },
};

export { ConfirmModal };
