import React, { Component } from 'react';
import { View, Vibration } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  CameraOverlay,
  Center,
  Spinner,
  EmptyStates,
  Icon,
  InteractionManager,
} from '../_shared/components/commons';
import { requestCameraPermissions } from './_helpers';
import initialState from './_helpers/initialState';
import { constants } from '../_shared/constants';
import { CameraClosed } from '.';

type Props = {
  navigation: Object,
  tollCollectorId: Number,
  ticketPrice: Number,
};
type State = {
  cameraPermissionsGranted: boolean,
  cameraServiceGranted: boolean,
  errorMessage: string,
  showSpinner: boolean,
  cameraOn: true,
};

class Camera extends Component<Props, State> {
  state = {
    cameraPermissionsGranted: true,
    cameraServiceGranted: true,
    errorMessage: '',
    genericErrorState: false,
    showSpinner: true,
    cameraOn: true,
  };

  async componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.requestPermissions();
    });
  }

  async requestPermissions() {
    this.setState({ ...initialState.camera });
    const resp = await requestCameraPermissions();
    if (resp) {
      return this.setState({
        showSpinner: false,
        cameraPermissionsGranted: true,
        errorMessage: '',
      });
    }
    return this.setState({
      cameraPermissionsGranted: false,
      showSpinner: false,
      errorMessage: constants.errorMessages.CAMERA_PERMISSION_NOT_GRANTED,
    });
  }

  renderContent() {
    const {
      showSpinner, cameraPermissionsGranted, errorMessage, cameraOn,
    } = this.state;
    const { navigation, tollCollectorId, ticketPrice } = this.props;

    if (showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    if (!cameraOn) {
      return <CameraClosed onButtonPress={() => this.requestPermissions()} />;
    }
    if (!cameraPermissionsGranted) {
      return (
        <View style={{ flex: 1 }}>
          <EmptyStates
            imageToUse="cameraOff"
            textToUse={errorMessage}
            onPress={() => {
              this.requestPermissions();
            }}
            button
            buttonText="Grant camera Permission"
          />
        </View>
      );
    }
    return (
      <View style={styles.cameraContainer}>
        <RNCamera
          captureAudio={false}
          ref={(camera) => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
          onBarCodeRead={(barcodeData) => {
            const { data } = barcodeData;
            Vibration.vibrate();
            this.setState({ cameraOn: false });
            return navigation.navigate('scanPayment', {
              psuedoId: data,
              tollCollectorId,
              ticketPrice,
            });
          }}
        >
          <CameraOverlay />
        </RNCamera>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header
          onLeftPressed={() => this.props.navigation.openDrawer()}
          leftContent
          left={<Icon name="ios-menu" size={20} color="white" groupName="Ionicons" />}
          leftHeaderText="Scan Code"
          leftHeaderTextStyle={styles.leftHeaderText}
        />
        {this.renderContent()}
      </Container>
    );
  }
}
const styles = {
  cameraContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 100,
    borderColor: 'black',
    opacity: 0.8,
  },
  square: {
    margin: 60,
    height: 50,
    width: 50,
    zIndex: 1000,
  },
  buttonContainer: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: '90%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
};

const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
  deviceHeight: state.layout.newLayoutHeight,
  tollCollectorId: state.profile.id,
  ticketPrice: state.profile.marketTicketPrice,
});

export default connect(
  mapStateToProps,
  {},
)(Camera);
