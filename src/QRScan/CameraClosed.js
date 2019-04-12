// @flow
import React from 'react';
import { View } from 'react-native';
import { Center, Icon, Button } from '../_shared/components/commons';

type Props = {
  onButtonPress: () => void,
};

const CameraClosed = (props: Props) => {
  const { onButtonPress } = props;
  return (
    <Center>
      <Icon name="ios-camera" groupName="Ionicons" color="#666" size={130} />
      <View style={{ width: '80%' }}>
        <Button
          buttonColor="purple"
          textColor="white"
          borderColor="white"
          onPress={onButtonPress}
          buttonText="Open Camera"
          rounded
        />
      </View>
    </Center>
  );
};

export { CameraClosed };
