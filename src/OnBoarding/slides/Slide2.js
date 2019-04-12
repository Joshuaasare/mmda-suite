import React from 'react';
import {
  View, Text, Dimensions, Image,
} from 'react-native';
import { moneyImage } from '../../_shared/assets/images';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Slide2 = () => (
  <View style={styles.slideStyle}>
    <View style={styles.imageContainerStyle}>
      <Image style={styles.imageStyle} source={moneyImage} />
    </View>
    <View style={styles.headerTextContainerStyle}>
      <Text style={styles.headerTextStyle}>Manage your revenue with MMDA suite</Text>
    </View>
    <View style={styles.buttonContainerStyle} />
  </View>
);

const styles = {
  slideStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    display: 'flex',
  },
  imageContainerStyle: {
    position: 'absolute',
    marginTop: 0.1 * SCREEN_HEIGHT,
    marginLeft: 0.1 * SCREEN_WIDTH,
    marginRight: 0.1 * SCREEN_WIDTH,
    // alignSelf: 'stretch',
    width: 0.8 * SCREEN_WIDTH,
    height: 0.8 * SCREEN_WIDTH,
    borderRadius: 0.4 * SCREEN_WIDTH,
    backgroundColor: '#ae8fbb',
  },
  headerTextContainerStyle: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 0.7 * SCREEN_HEIGHT,
  },
  buttonContainerStyle: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 0.8 * SCREEN_HEIGHT,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 0.2 * SCREEN_WIDTH,
    paddingLeft: 0.2 * SCREEN_WIDTH,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    color: '#1B2631',
    fontSize: 20,
  },
  mainTextTextStyle: {},
  imageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    borderRadius: 0.4 * SCREEN_WIDTH,
  },
  buttonStyle: {
    alignSelf: 'stretch',
  },
};

export { Slide2 };
