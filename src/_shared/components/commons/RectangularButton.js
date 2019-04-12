// flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  buttonText: string,
  buttonColor: string,
  textColor: string,
  borderColor: string,
  onPress: () => void,
  disabled: boolean,
};

const RectangularButton = (props: Props) => {
  const {
    buttonText, buttonColor, textColor, borderColor, onPress, disabled,
  } = props;
  return (
    <TouchableOpacity onPress={disabled ? null : onPress} style={styles.buttonContainerStyle}>
      <View
        style={[
          styles.rectangularButtonStyle,
          {
            backgroundColor: buttonColor,
            opacity: disabled ? 0.5 : 1,
            borderColor: borderColor || '#B2BABB',
          },
        ]}
      >
        <Text style={{ color: textColor }}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  rectangularButtonStyle: {
    marginTop: 10,
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainerStyle: {
    alignItems: 'center',
  },
};

export { RectangularButton };
