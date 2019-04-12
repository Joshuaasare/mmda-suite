import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapFooterItem } from '.';

type Props = {
  onWalkPressed: () => void,
  onDrivePressed: () => void,
  mode: string,
  eta: string,
  modeLoading: boolean,
};
const MapFooter = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.firstView}>
      <MapFooterItem
        iconName="ios-walk"
        disabled={props.mode !== 'walking'}
        groupName="Ionicons"
        onPress={props.onWalkPressed}
      />
      <MapFooterItem
        iconName="drive-eta"
        disabled={props.mode !== 'driving'}
        groupName="MaterialIcons"
        onPress={props.onDrivePressed}
      />
    </View>
    <View style={styles.secondView}>
      {props.modeLoading ? <ActivityIndicator size="small" /> : <Text>{`${props.eta}`}</Text>}
    </View>
  </View>
);
const styles = {
  container: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'row',
  },
  firstView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export { MapFooter };
