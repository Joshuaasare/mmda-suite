import React from 'react';
import { View } from 'react-native';

type Props = {
  header: any,
  children: React.ReactNode,
};

const Center = (props: Props) => (
  <View style={styles.page}>
    {props.header ? <View style={styles.header}>{props.header}</View> : null}
    <View style={styles.mainContent}>{props.children}</View>
  </View>
);

const styles = {
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export { Center };
