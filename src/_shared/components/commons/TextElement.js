import React from 'react';
import { Text } from 'react-native';
import normalize from '../../services/normalizeText';

const DEFAULT_FONT_SIZE = 14;

const TextElement = (props) => {
  const { style, childern, ...rest } = props;
  return (
    <Text style={[style, { fontSize: normalize(style.fontSize || DEFAULT_FONT_SIZE) }]} {...rest}>
      {children}
    </Text>
  );
};

export { TextElement };
