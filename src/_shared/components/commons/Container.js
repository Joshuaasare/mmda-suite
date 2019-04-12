// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { layoutUpdated } from '../../actions/layout_action';

type Props = {
  children: Object,
  centered: boolean,
  layoutUpdated: Object => void,
};
class Container extends Component<Props> {
  updateAppLayout: (e: Object) => void;

  updateAppLayout(e: Object) {
    const dimensions = {
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    };
    this.props.layoutUpdated(dimensions);
  }

  render() {
    return (
      <View
        onLayout={e => this.updateAppLayout(e)}
        style={[styles.container, this.props.centered ? styles.centered : null]}
      >
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default connect(
  null,
  { layoutUpdated },
)(Container);
