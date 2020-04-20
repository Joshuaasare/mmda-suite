/**
 * @Author: joshuaasare
 * @Date:   2018-12-27 14:59:46
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:02:46
 */

import React from 'react';
import {
  ImageBackground, Text, View, TouchableOpacity,
} from 'react-native';
// import { shopImage } from '../_shared/assets/images';
import { CircularButton } from '../_shared/components/commons';

type Props = {
  data: Object,
  iconName: string,
  borderRadius: number,
  iconColor: string,
  backgroundColor: string,
  onIconPressed: () => void,
};
const ShopCard = (props: Props) => (
  <View style={styles.mainContainerStyle}>
    <ImageBackground style={styles.imageStyle} source={{ uri: props.data.picture }}>
      <View style={styles.overlayView} />
    </ImageBackground>
    <View style={styles.descriptionViewStyle}>
      <View style={styles.mainTextViewStyle}>
        <Text style={styles.mainTextStyle}>{props.data.nameOfShop}</Text>
      </View>
      <View style={styles.textViewStyle}>
        <Text style={styles.textStyle}>{props.data.assembly.name}</Text>
      </View>
    </View>
    <View style={styles.iconContainerStyle}>
      <TouchableOpacity onPress={props.onIconPressed}>
        <CircularButton
          iconName={props.iconName}
          borderRadius={props.borderRadius}
          iconColor={props.iconColor}
          backgroundColor={props.backgroundColor}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = {
  mainContainerStyle: {
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    zIndex: 500,
  },
  imageStyle: {
    height: 230,
    width: '100%',
  },
  mainTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
  descriptionViewStyle: {
    position: 'absolute',
    left: 20,
    top: 20,
    height: 30,
  },
  mainTextViewStyle: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    width: 200,
    borderColor: 'white',
    zIndex: 1000,
  },
  overlayView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  textViewStyle: {
    paddingTop: 5,
  },
  iconContainerStyle: {
    position: 'absolute',
    top: 160,
    right: 20,
  },
};

export default ShopCard;
