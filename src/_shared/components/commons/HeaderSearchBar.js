/* @flow */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input, HeaderButton } from '.';

type Props = {
  backIconColor: string,
  onBackIconPress: () => void,
  iconPadding: Object,
  onSearch: () => void,
};
type State = {};
class HeaderSearchBar extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderButton
          iconPadding={this.props.iconPadding}
          onPress={this.props.onBackIconPress}
          headerIcon={<Icon name="ios-arrow-back" size={18} color={this.props.backIconColor} />}
        />
        <Input
          inputStyle={styles.inputStyle}
          placeholderTextColor="rgba(255,255,255, 0.3)"
          autoFocus
          placeholder="Search"
          onChangeText={this.props.onSearch}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    //  paddingVertical: 10,
  },
  inputStyle: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 0,
  },
};

export { HeaderSearchBar };
