import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const ListSeparator = props => <View style={[styles.separator, props.style]} />;

ListSeparator.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
};
ListSeparator.defaultProps = {
  style: null,
};

const styles = {
  separator: {
    height: 0.7,
    backgroundColor: '#eee',
  },
};

export { ListSeparator };
