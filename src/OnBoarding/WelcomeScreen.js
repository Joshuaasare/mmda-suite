// @flow
import React, { Component } from 'react';
import {} from 'react-native';
import Swiper from 'react-native-swiper';
import { Slide1, Slide2, Slide3 } from './slides';

class WelcomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Swiper
        loop={false}
        showsButtons={false}
        ref={(swiper) => {
          this.swipe = swiper;
        }}
      >
        <Slide1 swipe={this.swipe} />
        <Slide2 swipe={this.swipe} />
        <Slide3 swipe={this.swipe} navigation={navigation} />
      </Swiper>
    );
  }
}

export default WelcomeScreen;
