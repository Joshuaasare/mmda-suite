import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';

type Props = {
  secureTextEntry?: boolean,
  placeholder?: string,
  deviceWidth: number,
  detailsInput?: boolean,
  value: ?string,
  onChangeText: any,
  inputStyle?: Object,
  autoFocus?: boolean,
  placeholderTextColor?: string,
  editable?: boolean,
};

class Input extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TextInput
          autoFocus={this.props.autoFocus}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          editable={this.props.editable}
          autoCorrect={false}
          style={[
            this.props.inputStyle
              ? { ...this.props.inputStyle }
              : { fontSize: 15, marginBottom: 0 },
            !this.props.detailsInput
              ? { ...styles.inputStyle }
              : { width: this.props.deviceWidth - 170, padding: 3, margin: 0 },
          ]}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

const styles = {
  inputStyle: {},
};

Input.defaultProps = {
  secureTextEntry: false,
  placeholder: null,
  detailsInput: false,
  inputStyle: null,
  autoFocus: false,
  placeholderTextColor: null,
  editable: true,
};
const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
});

export default connect(mapStateToProps)(Input);
