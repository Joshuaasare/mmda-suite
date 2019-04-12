// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { EnterCodeForm, LoginForm } from './Forms';

type Props = {
  navigation: Object,
};

type State = {
  topViewFlex: number,
};

class AuthScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      topViewFlex: 2,
    };
  }

  onLayout = async (event) => {
    const { width, height } = await event.nativeEvent.layout;

    if (width > height) {
      return this.setState({ topViewFlex: 1 });
    }
    return this.setState({ topViewFlex: 2 });
  };

  render() {
    const { topViewFlex } = this.state;
    const { navigation } = this.props;
    return (
      <LinearGradient colors={['#f5f7fa', '#acbedd']} style={{ flex: 1 }}>
        <View style={styles.containerStyle} onLayout={this.onLayout}>
          <View style={{ flex: topViewFlex }}>
            <View style={{ flex: 1, padding: 15, alignItems: 'flex-end' }} />
            <View style={{ flex: 3 }} />
          </View>

          <View style={styles.bottomViewStyle}>
            <Swiper
              showsPagination={false}
              ref={(swiper) => {
                this.swipe = swiper;
              }}
              scrollEnabled={false}
            >
              <LoginForm swipe={this.swipe} />
              <EnterCodeForm swipe={this.swipe} navigation={navigation} />
            </Swiper>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  topViewStyle: {},
  bottomViewStyle: {
    flex: 5,
    flexDirection: 'row',
    paddingBottom: 20,
  },
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
)(AuthScreen);
