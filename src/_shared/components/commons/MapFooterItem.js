import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '.';

type Props = {
  iconName: string,
  groupName: string,
  onPress: () => void,
  disabled: boolean,
};

const MapFooterItem = (props: Props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <View style={[styles.inner, props.disabled === true ? { opacity: 0.7 } : null]}>
      <Icon name={props.iconName} groupName={props.groupName} size={20} color="white" />
    </View>
  </TouchableOpacity>
);

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    paddingVertical: 7,
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 20,
    margin: 5,
    width: 60,
  },
};

export { MapFooterItem };
