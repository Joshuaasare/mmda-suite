import React from 'react';
import {
  View, Modal, Text, ActivityIndicator,
} from 'react-native';

type Props = {
  animationType: string,
  modalVisible: boolean,
  loaderText?: string,
};

const Loader = (props: Props) => {
  const { animationType, modalVisible, loaderText } = props;
  return (
    <Modal
      animationType={animationType}
      transparent
      visible={modalVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.wrapper}>
        <View style={styles.loader}>
          <View style={styles.loaderContainer}>
            <View style={{ paddingRight: 7 }}>
              <ActivityIndicator size="small" color="white" />
            </View>
            <Text style={styles.textStyle}>{loaderText}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

Loader.defaultProps = {
  loaderText: 'Loading...',
};
const styles = {
  loader: {},
  wrapper: {
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'relative',
    width: 200,
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: '#1B2631',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    top: '20%',
  },
  textStyle: {
    color: 'white',
  },
};
export { Loader };
