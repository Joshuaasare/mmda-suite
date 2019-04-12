// flow
// code copied from https://github.com/oblador/react-native-vector-icons/issues/330
import React from 'react';
import {} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const VectorIcons = {
  MaterialIcons,
  EvilIcons,
  Entypo,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
  Octicons,
  SimpleLineIcons,
  Feather,
};

type Props = {
  groupName?: string,
  name: string,
  size: string,
  style?: Object,
  color: string,
};

const VectorIcon = (props: Props) => {
  const {
    groupName, name, size, style, color,
  } = props;
  const Icon = VectorIcons[groupName];
  return <Icon name={name} size={size} style={style} color={color} />;
};

VectorIcon.defaultProps = {
  style: {},
  groupName: 'Ionicons',
};

export default VectorIcon;
