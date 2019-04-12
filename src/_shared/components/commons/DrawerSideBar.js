/* @flow */
import React, { Component } from 'react';
import {
  Image, View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { profile } from '../../assets/images';

type Props = {};
type State = {};
class Drawer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDraweritems(props) {
    const {
      navigation, activeItemKey, getLabel, renderIcon, onItemPress,
    } = props;
    return navigation.state.routes.map((route, index) => {
      const focused = activeItemKey === route.key;
      const color = focused ? 'black' : '#444';
      const backgroundColor = focused ? 'rgba(238,238,238,0.3)' : 'transparent';
      const borderColor = focused ? 'white' : 'transparent';
      const scene = {
        route,
        index,
        focused,
        tintColor: color,
      };
      /*
      if (focused) {
        console.log('focused');
      }
      */
      const icon = renderIcon(scene);
      const label = getLabel(scene);

      return (
        <TouchableOpacity
          onPress={() => {
            onItemPress({ route, focused });
          }}
          key={route.key}
        >
          <View
            key={route.key}
            style={{
              ...styles.itemStyle,
              backgroundColor,
              borderLeftColor: borderColor,
              borderLeftWidth: 2.5,
            }}
          >
            <View style={styles.iconContainerStyle}>{icon}</View>
            <Text style={styles.labelStyle}>{label}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <LinearGradient colors={['#673ab7', '#512da8']} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.drawerTopView}>
            <View style={styles.imageViewStyle}>
              <TouchableOpacity>
                <Image style={styles.imageStyle} source={profile} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileDetail}>
              <Text style={styles.profileName}>Susaans Maning</Text>
              <Text style={styles.profileAssembly}>Kumasi MetroPolitan Assembly</Text>
            </View>
          </View>
          {this.renderDraweritems(this.props)}
        </ScrollView>
      </LinearGradient>
    );
  }
}

const imageSize = 100;
const radius = imageSize - 80;

const styles = {
  container: {
    flex: 1,
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainerStyle: {
    paddingHorizontal: 20,
  },
  labelStyle: {
    fontSize: 18,
    color: 'white',
  },
  drawerTopView: {
    marginLeft: 10,
    marginVertical: 20,
  },
  overlayView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  imageViewStyle: {
    height: imageSize,
    width: imageSize,
    //  elevation: 2,
    borderRadius: radius,
    justifyContent: 'center',
  },
  imageStyle: {
    height: imageSize,
    width: imageSize,
    borderRadius: radius,
  },
  profileDetail: {},
  profileName: {
    color: '#D6DBDF',
    fontSize: 16,
  },
  profileAssembly: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
};

export default Drawer;
