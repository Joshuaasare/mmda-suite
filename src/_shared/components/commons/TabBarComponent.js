/* @flow */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  navigation: Object,
};
type State = {};

class TabBarComponent extends Component<Props, State> {
  renderItems(props) {
    const {
      jumpTo, navigation, getLabelText, renderIcon,
    } = props;
    return navigation.state.routes.map((route, index) => {
      const focused = navigation.state.routes[navigation.state.index].key === route.key;
      const color = focused ? '#853253' : '#444';
      const backgroundColor = focused ? 'rgba(238,238,238,0.7)' : 'transparent';
      const borderColor = focused ? '#853253' : 'transparent';
      const scene = {
        route,
        index,
        focused,
        tintColor: color,
      };

      const icon = renderIcon(scene);
      const label = getLabelText(scene);

      return (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            jumpTo(navigation.state.routes[index].routeName);
          }}
          key={route.key}
        >
          <View
            key={route.key}
            style={{
              ...styles.itemStyle,
              backgroundColor,
              borderBottomColor: borderColor,
              borderBottomWidth: 2.5,
            }}
          >
            <View style={styles.iconContainerStyle}>{icon}</View>
            <Text style={{ ...styles.labelStyle, color }}>{label}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const { navigation } = this.props;
    const flex = navigation.state.routes.length;
    //  console.warn(flex);
    return (
      <View style={styles.tabBarContainer}>
        <View style={{ flex, flexDirection: 'row' }}>{this.renderItems(this.props)}</View>
      </View>
    );
  }
}

const styles = {
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
  },
  itemStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconContainerStyle: {
    paddingHorizontal: 20,
  },
  labelStyle: {
    fontSize: 15,
  },
};

export default TabBarComponent;
