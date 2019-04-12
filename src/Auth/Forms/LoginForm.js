// @flow
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Input, Button, Loader } from '../../_shared/components/commons';
import { loginPinChanged, loginPhoneNumberChanged } from '../_helpers/auth_actions';
import { requestCode, setUserPhoneAndLoginAttempts } from '../../_shared/services';

const ICON_SIZE = 15;

type Props = {
  phoneNumber: string,
  pinNumber: string,
  loading: boolean,
  swipe: Object,
  loginPhoneNumberChanged: (phone: string) => {},
  loginPinChanged: (pin: string) => {},
};

type State = {
  showModal: boolean,
  loginPasswordSecureText: boolean,
};

class LoginForm extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { loginPasswordSecureText: true, showModal: false };
  }

  onLoginPhoneNumberChanged = phone => this.props.loginPhoneNumberChanged(phone);

  onLoginPinChanged = pin => this.props.loginPinChanged(pin);

  tryLogin = async () => {
    const { pinNumber, phoneNumber } = this.props;
    this.setState({ showModal: true });
    setTimeout(async () => {
      const { swipe } = this.props;
      const resp = await requestCode(phoneNumber, pinNumber);
      if (resp.error) {
        this.setState({ showModal: false });
        Alert.alert(resp.error);
      } else {
        const { phone } = await resp.data;
        this.setState({ showModal: false });
        setUserPhoneAndLoginAttempts(phone);
        return swipe.scrollBy(1);
      }
      return null;
    }, 1000);
  };

  render() {
    const { phoneNumber, pinNumber, loading } = this.props;
    const { loginPasswordSecureText, showModal } = this.state;
    return (
      <View style={styles.loginFormStyle}>
        <View style={styles.inputContainerStyle}>
          <Icon size={ICON_SIZE} iconStyle={{ paddingBottom: 0 }} name="phone" />
          <Input
            placeholder="Phone Number"
            onChangeText={phone => this.onLoginPhoneNumberChanged(phone)}
            value={phoneNumber}
          />
        </View>

        <View style={styles.inputContainerStyle}>
          <Icon size={ICON_SIZE} iconStyle={{ paddingBottom: 0 }} name="key" />
          <Input
            placeholder="Pin Code"
            secureTextEntry={loginPasswordSecureText}
            onChangeText={pin => this.onLoginPinChanged(pin)}
            value={pinNumber}
          />
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Icon
              size={ICON_SIZE}
              iconStyle={{ paddingBottom: 0 }}
              name={loginPasswordSecureText ? 'eye' : 'eye-slash'}
              onPress={() => {
                this.setState({ loginPasswordSecureText: !loginPasswordSecureText });
              }}
            />
          </View>
        </View>

        <View style={styles.buttonContainerStyle}>
          <Button
            buttonText="Login"
            buttonColor="#1B2631"
            textColor="white"
            borderColor="#1B2631"
            rounded
            onPress={this.tryLogin}
            disabled={!(phoneNumber.trim().length === 10 && pinNumber.trim().length > 3)}
          />

          <Loader
            modalVisible={loading || showModal}
            animationType="fade"
            loaderText="Signing in.."
          />
        </View>
      </View>
    );
  }
}

const styles = {
  inputContainerStyle: {
    borderColor: '#B2BABB',
    borderBottomWidth: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10,
  },
  buttonContainerStyle: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  loginFormStyle: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 60,
    marginRight: 60,
  },
};

const mapStateToProps = ({ auth }) => ({
  phoneNumber: auth.loginPhone,
  pinNumber: auth.loginPin,
  loading: auth.loading,
  error: auth.error,
});

export default connect(
  mapStateToProps,
  {
    loginPhoneNumberChanged,
    loginPinChanged,
  },
)(LoginForm);
