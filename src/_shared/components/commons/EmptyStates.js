// @flow
import React from 'react';
import { View, Image, Text } from 'react-native';
import { Button } from '.';
// import { noMapp, profile } from './src/_shared/assets/images';

type Props = {
  imageToUse: string,
  textToUse: string,
  onPress: () => void,
  button?: boolean,
  buttonText: string,
};

const EmptyStates = (props: Props) => {
  const selectImage = (image) => {
    switch (image) {
      case 'locationOff':
        return require('../../assets/images/directions.png');
      case 'error':
        return require('../../assets/images/robot.png');
      case 'noLocation':
        return require('../../assets/images/blank.png');
      case 'cameraOff':
        return require('../../assets/images/camera.png');
      case 'sync':
        return require('../../assets/images/sync.png');
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Image source={selectImage(props.imageToUse)} style={styles.imageStyle} />
      <Text style={styles.textStyle}>{props.textToUse}</Text>

      {props.button && (
        <View style={{ width: '90%' }}>
          <Button
            buttonText={props.buttonText}
            buttonColor="purple"
            textColor="white"
            borderColor="white"
            disabled={false}
            onPress={props.onPress}
            rounded
          />
        </View>
      )}
    </View>
  );
};

EmptyStates.defaultProps = {
  button: false,
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  imageStyle: {
    height: '50%',
    width: '100%',
  },
  textStyle: {
    width: '95%',
    maxWidth: 500,
    textAlign: 'center',
  },
};

export { EmptyStates };
