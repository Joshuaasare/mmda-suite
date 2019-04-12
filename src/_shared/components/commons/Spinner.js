import React from 'react';
import { View, ActivityIndicator } from 'react-native';

type Props = {
  overlay?: boolean,
  size?: number,
  color?: string,
};

const Spinner = (props: Props) => (
  <View style={[styles.spinner, props.overlay ? styles.overlay : null]}>
    <ActivityIndicator color={props.color} size={props.size} />
  </View>
);
const styles = {
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    zIndex: 100,
  },
};

Spinner.defaultProps = {
  color: 'purple',
  size: 50,
  overlay: false,
};

export { Spinner };
