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
  width?: number,
  rounded?: boolean,
};

const Button = (props: Props) => {
  const {
    buttonText,
    buttonColor,
    textColor,
    borderColor,
    onPress,
    disabled,
    width,
    rounded,
  } = props;
  return (
    <TouchableOpacity onPress={disabled ? null : onPress} style={styles.buttonContainerStyle}>
      <View
        style={[
          styles.roundedButtonStyle,
          {
            backgroundColor: buttonColor,
            opacity: disabled ? 0.5 : 1,
            //  borderColor: borderColor || buttonColor,
          },
          width && { width },
          rounded && { borderRadius: 25 },
        ]}
      >
        <Text style={{ color: textColor }}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  width: '100%',
  rounded: false,
};

const styles = {
  roundedButtonStyle: {
    marginTop: 10,
    borderWidth: 0,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainerStyle: {
    alignItems: 'center',
  },
};

export { Button };
