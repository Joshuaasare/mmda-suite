/**
 * @Author: joshuaasare
 * @Date:   2019-01-01 20:48:59
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:02:35
 */

// @flow
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

type Props = {
  data: Array<{
    title: string,
    subtitle: string,
  }>,
  deviceWidth: number,
};

class FormDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        {this.props.data.map((item, i, arr) => (
          <View
            key={i}
            style={i === arr.length - 1 ? styles.lastItemContainerStyle : styles.containerStyle}
          >
            <View style={styles.titleViewStyle}>
              <Text style={styles.titleTextStyle}>{item.title}</Text>
            </View>
            <View style={{ ...styles.subtitleViewStyle, width: this.props.deviceWidth - 190 }}>
              <Text style={item.color ? { color: item.color } : null}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = {
  lastItemContainerStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    //  marginBottom: 10,
    flexDirection: 'row',
  },
  containerStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    //  marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
  },
  titleViewStyle: {
    width: 150,
    justifyContent: 'center',
  },
  subtitleViewStyle: {
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: '#AEB6BF',
  },
  subtitleTextStyle: {},
};

const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
});

export default connect(mapStateToProps)(FormDetails);
