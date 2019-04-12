// @flow
import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  iconName: string,
  iconSize: number,
  style: Object,
  headerText: string,
};
const ListHeader = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.dividerStyle}>
      <Ionicons name={props.iconName} size={props.iconSize} />
    </View>
    <Text style={{ ...props.style }}>{props.headerText}</Text>
  </View>
);

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerStyle: {
    padding: 5,
  },
};

export { ListHeader };
