import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => <View style={styles.containerStyle}>{children}</View>;

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};

export { CardSection };
