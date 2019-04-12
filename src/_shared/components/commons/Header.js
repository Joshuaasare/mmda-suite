// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { HeaderButton, HeaderSearchBar } from '.';

type Props = {
  leftContent: boolean,
  left?: any,
  leftHeaderText?: string,
  leftHeaderTextStyle: Object,
  onLeftPressed: any,
  onRightPressed: any,
  rightContent: boolean,
  right?: any,
  rightHeaderText?: string,
  rightHeaderTextStyle: Object,
  showSearchBar: boolean,
  onBackIconPress: () => void,
};

type State = {
  searchBarVisible: boolean,
};

class Header extends Component<Props, State> {
  state = {
    searchBarVisible: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ searchBarVisible: nextProps.showSearchBar });
  }

  renderLeftContent() {
    if (!this.props.leftContent) {
      return null;
    }
    return (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <HeaderButton
          onPress={this.props.onLeftPressed}
          headerIcon={this.props.left}
          headerText={this.props.leftHeaderText}
          headerTextStyle={this.props.leftHeaderTextStyle}
        />
      </View>
    );
  }

  renderRightContent() {
    if (!this.props.rightContent) {
      return null;
    }
    return (
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <HeaderButton
          onPress={this.props.onRightPressed}
          headerIcon={this.props.right}
          headerText={this.props.rightHeaderText}
          headerTextStyle={this.props.rightHeaderTextStyle}
        />
      </View>
    );
  }

  render() {
    return (
      <LinearGradient colors={['#673ab7', '#512da8']} style={styles.viewStyle}>
        {this.state.searchBarVisible ? (
          <HeaderSearchBar
            backIconColor="white"
            iconPadding={{ paddingRight: 20 }}
            onBackIconPress={this.props.onBackIconPress}
          />
        ) : (
          <View style={styles.headerContainerStyle}>
            {this.renderLeftContent()}
            {this.renderRightContent()}
          </View>
        )}
      </LinearGradient>
    );
  }
}

Header.defaultProps = {
  left: null,
  leftIconColor: null,
  leftHeaderText: null,

  right: null,
  rightIconColor: null,
  rightHeaderText: null,
};

const styles = {
  viewStyle: {
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
  },
  headerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  iconViewStyle: {
    paddingRight: 20,
  },
  headerTextStyle: {
    color: 'white',
    fontSize: 16,
  },
};

export { Header };
