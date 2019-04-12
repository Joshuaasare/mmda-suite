// @flow
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { verificationCodeChanged } from '../_helpers/auth_actions';
import { loadUserData } from '../../_shared/actions/profile_action';
import { Input, Loader, Button } from '../../_shared/components/commons';
import {
  verifyCode,
  resendUserVerificationCode,
  setUserAsLoggedIn,
  hasCompletedSetup,
} from '../../_shared/services';
import { runAttemptsCheckAlgorithm } from '../attemptsCheck';

const ICON_SIZE = 15;

type Props = {
  code: ?string,
  swipe: Object,
  navigation: Object,
  loading: boolean,
  verificationCodeChanged: (code: ?string) => {},
  loadUserData: (userData: Object) => {},
};

type State = {
  showModal: boolean,
  mainText: string,
};

class EnterCodeForm extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      mainText: 'Enter the code we sent to your number',
    };
  }

  onVerificationCodeChanged = (code: ?string) => this.props.verificationCodeChanged(code);

  onConfirmPressed = async () => {
    const { code } = this.props;
    this.setState({ showModal: true });

    setTimeout(async () => {
      const { swipe, navigation } = this.props;
      const resp = await verifyCode(code);
      if (resp.error) {
        this.setState({ showModal: false });
        await runAttemptsCheckAlgorithm(swipe, resp.error);
      } else {
        // return navigation.replace('drawerPages');
        /*
        NOTE: there are some things Mr. Yankey did here in his code, that are important,
        he checked if the user has logged in for the first time and caused her to change
        her pin, this is because since the sectional head logged the user in
        she might know the pin of the toll collector
        */
        console.log(resp.data.userData);
        this.props.loadUserData(resp.data.userData);
        setUserAsLoggedIn();
        this.setState({ showModal: false });

        if (await hasCompletedSetup()) {
          return navigation.replace('drawerPages');
        }
        console.log('going to sync');
        return navigation.replace('sync');
      }
      return null;
    }, 1000);
  };

  onResendPressed = async () => {
    this.setState({ showModal: true });
    const resp = await resendUserVerificationCode();
    if (resp.error) {
      this.setState({ showModal: false });
      Alert.alert(resp.error);
    } else {
      this.setState({ showModal: false, mainText: 'A new code has been sent to your mobile' });
    }
  };

  render() {
    const { mainText, showModal } = this.state;
    const { code, loading } = this.props;
    return (
      <View style={styles.loginFormStyle}>
        <View style={styles.textContainerStyle}>
          <Text style={styles.textStyle}>{mainText}</Text>

          <Icon size={50} iconStyle={{ paddingBottom: 0 }} name="lock" />
        </View>
        <View style={styles.inputContainerStyle}>
          <Icon size={ICON_SIZE} iconStyle={{ paddingBottom: 0 }} name="key" />
          <Input
            placeholder="Enter Code Here"
            onChangeText={val => this.onVerificationCodeChanged(val)}
            value={code}
          />
        </View>

        <View style={styles.buttonContainerStyle}>
          <Button
            buttonText="Confirm"
            buttonColor="#1B2631"
            textColor="white"
            borderColor="#1B2631"
            rounded
            onPress={this.onConfirmPressed}
            disabled={!(code.trim().length === 4)}
          />

          <TouchableOpacity onPress={this.onResendPressed}>
            <View style={styles.resendCodeView}>
              <Icon size={ICON_SIZE} iconStyle={{ paddingBottom: 0 }} name="repeat" />
              <Text style={styles.textStyle}>Resend Code</Text>
            </View>
          </TouchableOpacity>

          <Loader
            modalVisible={loading || showModal}
            animationType="fade"
            loaderText="Please wait.."
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
  textContainerStyle: {
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignSelf: 'stretch',
  },
  textStyle: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
  },
  resendCodeView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
};

const mapStateToProps = ({ auth }) => ({
  code: auth.code,
});

export default connect(
  mapStateToProps,
  { verificationCodeChanged, loadUserData },
)(EnterCodeForm);
