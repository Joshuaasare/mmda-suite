/**
 * @Author: joshuaasare
 * @Date:   2019-02-04 15:58:38
 * @Last modified by:   Joshua Asare
 * @Last modified time: 2019-11-01 17:12:04
 */
/* @flow */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import initialState from './_helpers/initialState';
import { constants } from '../_shared/constants';
import { paidForToday } from '../_shared/services';
import {
  Header,
  Container,
  Icon,
  Center,
  Spinner,
  EmptyStates,
  CircularButton,
  InteractionManager,
} from '../_shared/components/commons';
import {
  fetchAllShopCoordinatesAndData,
  requestLocationPermissions,
  getPixelSizeForLayoutSize,
  fetchGeolocation,
} from './_helpers';

type Props = {
  navigation: Object,
  deviceWidth: Number,
  deviceHeight: Number,
};
type State = {
  userLocationCoords: Array<Object>,
  coordinates: Array<Object>,
  data: Array<Object>,
  showSpinner: boolean,
  locationPermissionsGranted: boolean,
  locationServiceGranted: boolean,
  genericErrorState: boolean,
  errorMessage: string,
};
class App extends Component<Props, State> {
  state = {
    userLocationCoords: [],
    coordinates: [],
    data: [],
    showSpinner: true,
    locationPermissionsGranted: true,
    locationServiceGranted: true,
    errorMessage: '',
    genericErrorState: false,
  };

  async componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const resp = await fetchAllShopCoordinatesAndData();
      this.setState({ coordinates: resp.newShopsCoordinates, data: resp.newShopsData });

      return this.requestPermissions();
    });
  }

  async requestPermissions() {
    this.setState({ ...initialState.map });
    const resp = await requestLocationPermissions();
    if (resp) {
      // return this.setState({ showSpinner: false });
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

  fetchUserLocation() {
    const geolocation = fetchGeolocation();
    geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const userLocationCoords = [{ latitude, longitude }];
        this.setState({
          userLocationCoords,
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
        //    maximumAge: 10000,
      },
    );
  }

  fitMapToCoordinates(coordinates) {
    this.mapView.fitToCoordinates(coordinates, {
      edgePadding: {
        right: getPixelSizeForLayoutSize(this.props.deviceWidth),
        bottom: getPixelSizeForLayoutSize(this.props.deviceHeight),
        left: getPixelSizeForLayoutSize(this.props.deviceWidth),
        top: getPixelSizeForLayoutSize(this.props.deviceHeight),
      },
    });
  }

  renderContent() {
    const {
      showSpinner,
      userLocationCoords,
      locationPermissionsGranted,
      locationServiceGranted,
      genericErrorState,
      errorMessage,
      coordinates,
      data,
    } = this.state;

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
          showsUserLocation
          showsMyLocationButton
          ref={(mapView) => {
            this.mapView = mapView;
          }}
          onLayout={() => {
            !isEmpty(coordinates) && this.fitMapToCoordinates(coordinates);
          }}
        >
          {data.map(item => (
            <MapView.Marker
              title={item.nameOfShop}
              key={item.psuedoId}
              onCalloutPress={() => {
                this.props.navigation.navigate('direction', {
                  data: item,
                });
              }}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}
              pinColor={paidForToday(item.psuedoId) === true ? 'green' : 'red'}
            />
          ))}
        </MapView>
        <View style={styles.circularButtonView1}>
          <TouchableOpacity
            onPress={() => {
              !isEmpty(coordinates) && this.fitMapToCoordinates(coordinates);
            }}
          >
            <CircularButton
              borderRadius={25}
              iconName="maximize"
              iconColor="black"
              backgroundColor="white"
              groupName="Feather"
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
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header
          onLeftPressed={() => this.props.navigation.openDrawer()}
          leftContent
          left={<Icon name="ios-menu" size={20} color="white" />}
          leftHeaderText="Collection"
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
  circularButtonView1: {
    position: 'absolute',
    bottom: 80,
    right: '5%',
  },
  circularButtonView2: {
    position: 'absolute',
    bottom: 20,
    right: '5%',
  },
};

const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
  deviceHeight: state.layout.newLayoutHeight,
});

export default connect(mapStateToProps)(App);
