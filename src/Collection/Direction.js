/*
 * @Author: Joshua Asare
 * @Date: 2019-11-01 17:14:30
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-11-05 22:59:57
 */

/* @flow */
import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import initialState from './_helpers/initialState';
import { onMapReady, resetWidth, travelModeChanged } from './_helpers/collection_action';
import {
  Header,
  Container,
  Center,
  Spinner,
  EmptyStates,
  MapFooter,
  Icon,
  CircularButton,
  InteractionManager,
} from '../_shared/components/commons';
import {
  requestLocationPermissions,
  getPixelSizeForLayoutSize,
  checkIfShopLocationExist,
  getRealTimeDurationAndDistance,
  fetchGeolocation,
} from './_helpers';
import { constants } from '../_shared/constants';
import markerHome from '../_shared/assets/images/marker_home.png';
import markerBlack from '../_shared/assets/images/marker_black.png';

type Props = {
  navigation: Object,
  deviceWidth: Number,
  deviceHeight: Number,
};
type State = {
  initialRegion: Object,
  directionResults: Object,
  userLocationCoords: Array<Object>,
  destination: Object,
  showSpinner: boolean,
  locationPermissionsGranted: boolean,
  locationServiceGranted: boolean,
  genericErrorState: boolean,
  errorMessage: string,
  locationIsEmpty: boolean,
  width: Number,
  mode: string,
  modeLoading: boolean,
  modeClicked: boolean,
  eta: string,
};

class Direction extends Component<Props, State> {
  state = {
    initialRegion: {},
    directionResults: {},
    userLocationCoords: [],
    destination: {},
    showSpinner: true,
    locationPermissionsGranted: true,
    locationServiceGranted: true,
    errorMessage: '',
    genericErrorState: false,
    locationIsEmpty: false,
    width: 0,
    mode: 'walking',
    modeLoading: true,
    modeClicked: false,
    eta: '',
  };

  async componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.checkShopLocation();
    });
  }

  async onUserLocationChange(origin, destination) {
    const { mode } = this.state;
    const modeToText = mode === 'walking' ? 'walk' : 'drive';
    const resp = await getRealTimeDurationAndDistance({
      origin,
      destination,
      mode,
    });
    if (resp.error) {
      return this.setState({
        eta: 'Request failed',
      });
    }
    return this.setState({
      eta: `About ${resp.duration} (${resp.distance}) ${modeToText}`,
    });
  }

  async resetDurationAndDistance(origin, destination, deviceWidth, result) {
    const { mode } = this.state;
    const modeToText = mode === 'walking' ? 'walk' : 'drive';
    const resp = await getRealTimeDurationAndDistance({
      origin,
      destination,
      mode,
    });
    if (resp.error) {
      return this.setState({
        eta: 'Request failed',
        modeLoading: false,
        modeClicked: false,
        width: deviceWidth,
        directionResults: result,
      });
    }
    return this.setState({
      eta: `About ${resp.duration} (${resp.distance}) ${modeToText}`,
      modeLoading: false,
      modeClicked: false,
      width: deviceWidth,
      directionResults: result,
    });
  }

  async checkShopLocation() {
    const data = this.props.navigation.state.params.data;
    const resp = await checkIfShopLocationExist(data);
    if (resp) {
      this.setState({
        destination: {
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
        },
      });
      return this.requestPermissions();
    }
    return this.setState({
      locationIsEmpty: true,
      showSpinner: false,
      errorMessage: constants.errorMessages.NO_LOCATION,
    });
  }

  async requestPermissions() {
    this.setState({ ...initialState.direction });
    const resp = await requestLocationPermissions();
    if (resp) {
      return this.fetchUserLocation();
    }
    return this.setState({
      locationPermissionsGranted: false,
      showSpinner: false,
      errorMessage: constants.errorMessages.LOCATION_PERMISSION_NOT_GRANTED,
    });
  }

  async requestLocationService() {
    this.setState({ ...initialState.direction });
    this.fetchUserLocation();
  }

  changeTravelMode(mode) {
    this.setState({ mode, modeLoading: true, modeClicked: true });
    //  return this.fetchUserLocation();
  }

  fetchUserLocation() {
    const geolocation = fetchGeolocation();
    geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const userLocationCoords = [{ latitude, longitude }];
        this.setState({
          userLocationCoords,
          initialRegion: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
          showSpinner: false,
        });
      }, // success
      (error) => {
        switch (error.code) {
          case 1:
            this.setState({
              locationPermissionsGranted: false,
              showSpinner: false,
              errorMessage: constants.errorMessages.LOCATION_PERMISSION_NOT_GRANTED,
            });
            break;
          case 2:
            this.setState({
              genericErrorState: true,
              showSpinner: false,
              errorMessage: constants.errorMessages.POSITION_UNAVAILABLE,
            });
            break;
          case 3:
            this.setState({
              genericErrorState: true,
              showSpinner: false,
              errorMessage: constants.errorMessages.REQUEST_TIMEOUT,
            });
            break;
          case 4:
            this.setState({
              genericErrorState: true,
              showSpinner: false,
              errorMessage: constants.errorMessages.PLAY_SERVICES_UNAVAILABLE,
            });
            break;
          case 5:
            this.setState({
              locationServiceGranted: false,
              showSpinner: false,
              errorMessage: constants.errorMessages.LOCATION_SERVICE_UNAVAILABLE,
            });
            break;
          default:
            return null;
        }
        return null;
        // TODO: Process map accessibility errors
      }, // error
      {
        enableHighAccuracy: true,
        timeout: 15000,
        //  maximumAge: 10000,
      },
    );
  }

  fitMapToCoordinates(coordinates: Array<Object>) {
    this.mapView.fitToCoordinates(coordinates, {
      edgePadding: {
        right: getPixelSizeForLayoutSize(this.props.deviceWidth),
        bottom: getPixelSizeForLayoutSize(this.props.deviceHeight),
        left: getPixelSizeForLayoutSize(this.props.deviceWidth),
        top: getPixelSizeForLayoutSize(this.props.deviceHeight),
      },
    });
    this.setState({ width: 0 });
  }

  renderContent() {
    const {
      initialRegion,
      userLocationCoords,
      showSpinner,
      locationPermissionsGranted,
      locationServiceGranted,
      genericErrorState,
      errorMessage,
      locationIsEmpty,
      directionResults,
      width,
      mode,
      modeLoading,
      modeClicked,
      destination,
      eta,
    } = this.state;
    const { deviceWidth } = this.props;
    const data = this.props.navigation.state.params.data;
    if (locationIsEmpty) {
      return (
        <View style={{ flex: 1 }}>
          <EmptyStates imageToUse="noLocation" textToUse={errorMessage} />
        </View>
      );
    }
    if (showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    if (!locationPermissionsGranted) {
      return (
        <View style={{ flex: 1 }}>
          <EmptyStates
            onPress={() => {
              this.requestPermissions();
            }}
            button
            buttonText="Grant location Permission"
            imageToUse="locationOff"
            textToUse={errorMessage}
          />
        </View>
      );
    }

    if (!locationServiceGranted) {
      return (
        <View style={{ flex: 1 }}>
          <EmptyStates
            imageToUse="locationOff"
            textToUse={errorMessage}
            onPress={() => {
              this.requestLocationService();
            }}
            button
            buttonText="Turn on location"
          />
        </View>
      );
    }

    if (genericErrorState) {
      return (
        <View style={{ flex: 1 }}>
          <EmptyStates
            imageToUse="error"
            textToUse={errorMessage}
            button
            buttonText="Retry"
            onPress={() => {
              this.requestLocationService();
            }}
          />
        </View>
      );
    }
    return (
      <View style={styles.map}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.initialRegion}
          showsUserLocation
          showsMyLocationButton
          onUserLocationChange={(e) => {
            const origin = e.nativeEvent.coordinate;
            this.onUserLocationChange(origin, destination);
          }}
          ref={(mapView) => {
            this.mapView = mapView;
          }}
          onLayout={() => !isEmpty(directionResults)
            && width !== deviceWidth
            && this.fitMapToCoordinates(directionResults.coordinates)
          }
        >
          <MapView.Marker
            title="You"
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
          />
          <MapView.Marker
            title={data.nameOfShop}
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
          >
            <Image source={markerHome} style={styles.markerImageStyle} />
          </MapView.Marker>
          <MapViewDirections
            origin={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            destination={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            apikey={constants.map.GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="purple"
            resetOnChange={false}
            modeClicked={modeClicked}
            mode={mode}
            onReady={(result) => {
              this.fitMapToCoordinates(result.coordinates);
              this.resetDurationAndDistance(initialRegion, destination, deviceWidth, result);
            }}
            onError={(error) => {
              this.setState({
                genericErrorState: true,
                errorMessage: error.message,
              });
            }}
          />
        </MapView>
        <View style={styles.circularButtonView1}>
          <TouchableOpacity
            onPress={() => {
              !isEmpty(directionResults) && this.fitMapToCoordinates(directionResults.coordinates);
            }}
          >
            <CircularButton
              borderRadius={25}
              iconName="directions"
              iconColor="black"
              backgroundColor="white"
              groupName="MaterialIcons"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.circularButtonView2}>
          <TouchableOpacity
            onPress={() => {
              !isEmpty(userLocationCoords) && this.fitMapToCoordinates(userLocationCoords);
            }}
          >
            <CircularButton
              borderRadius={25}
              iconName="gps-fixed"
              iconColor="black"
              backgroundColor="white"
              groupName="MaterialIcons"
            />
          </TouchableOpacity>
        </View>
        <MapFooter
          onWalkPressed={() => this.changeTravelMode('walking')}
          onDrivePressed={() => this.changeTravelMode('driving')}
          eta={eta && eta}
          mode={mode}
          modeLoading={modeLoading !== false}
        />
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header
          onLeftPressed={() => this.props.navigation.goBack()}
          leftContent
          left={<Icon name="ios-arrow-round-back" groupName="Ionicons" size={20} color="white" />}
          leftHeaderText="Back"
          leftHeaderTextStyle={styles.leftHeaderText}
        />
        <View style={styles.container}>{this.renderContent()}</View>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  markerImageStyle: {
    height: 40,
    width: 40,
  },
  circularButtonView1: {
    position: 'absolute',
    bottom: 130,
    right: '5%',
  },
  circularButtonView2: {
    position: 'absolute',
    bottom: 70,
    right: '5%',
  },
};

const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
  deviceHeight: state.layout.newLayoutHeight,
  directionResults: state.collection.directionResults,
  width: state.collection.width,
  modeLoading: state.collection.modeLoading,
  mode: state.collection.mode,
});
// onUserLocationChange={e => this.onUserLocationChange(e.nativeEvent.coordinate)}
export default connect(
  mapStateToProps,
  { onMapReady, resetWidth, travelModeChanged },
)(Direction);
