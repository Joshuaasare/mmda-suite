// @flow
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Icon } from '.';

type Props = {
  borderRadius: number,
  iconName: string,
  iconColor: string,
  backgroundColor: string,
  imageUrl?: string,
  groupName?: string,
};

type State = {};
class CircularButton extends Component<Props, State> {
  static defaultProps = {
    imageUrl: null,
    groupName: 'Ionicons',
  };

  renderSize() {
    const { borderRadius } = this.props;
    return {
      height: borderRadius * 2,
      width: borderRadius * 2,
      borderRadius,
    };
  }

  renderContent() {
    if (this.props.imageUrl) {
      return <Image style={this.renderSize()} source={{ uri: this.props.imageUrl }} />;
    }

    return (
      <Icon
        groupName={this.props.groupName}
        name={this.props.iconName}
        size={this.props.borderRadius}
        color={this.props.iconColor}
      />
    );
  }

  render() {
    const { backgroundColor, imageUrl } = this.props;
    return (
      <View
        style={[
          imageUrl ? styles.imageContainerStyle : styles.buttonContainerStyle,
          {
            backgroundColor,
          },
          this.renderSize(),
        ]}
      >
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  buttonContainerStyle: {
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainerStyle: {
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
};

export { CircularButton };
