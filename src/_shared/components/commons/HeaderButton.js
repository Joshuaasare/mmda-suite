// flow
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

type Props = {
  headerText?: string,
  headerTextStyle?: Object,
  headerIcon?: any,
  onPress: any,
  iconPadding?: Object,
};

type State = {};

class HeaderButton extends Component<Props, State> {
  renderIcon() {
    const paddingStyle = this.props.headerText
      ? { paddingRight: 10 }
      : { ...this.props.iconPadding };
    return <View style={paddingStyle}>{this.props.headerIcon}</View>;
  }

  renderText() {
    const { headerText } = this.props;
    return <Text style={this.props.headerTextStyle}>{headerText}</Text>;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.viewStyle}>
          {this.props.headerIcon ? this.renderIcon() : null}
          {this.renderText()}
        </View>
      </TouchableOpacity>
    );
  }
}

HeaderButton.defaultProps = {
  headerText: null,
  headerTextStyle: null,
  headerIcon: null,
  iconPadding: null,
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export { HeaderButton };
