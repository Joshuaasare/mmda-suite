/* @flow */
import React, { Component } from 'react';
import {
  View, InteractionManager, Dimensions, PixelRatio, Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import {
  Header, Container, Center, Spinner,
} from '.';
import { requestLocationPermissions } from '../../../Collection/_helpers';
import { constants } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: Object,
};
type State = {
  region: Object,
  showSpinner: boolean,
};

class Direction extends Component<Props, State> {
  state = {
    region: {},
    showSpinner: true,
  };

  async componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const resp = await requestLocationPermissions();
      if (resp) {
        this.fetchUserLocation();
      }
      // TODO: Process map accessibility errors
    });
  }

  fetchUserLocation() {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
          showSpinner: false,
        });
      }, // success
      () => {
        //  console.log(`code: ${error.code}, message: ${error.message}`);
        // TODO: Process map accessibility errors
      }, // error
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximunAge: 10000,
      },
    );
  }

  fitMapToCoordinates(result: Object) {
    //  console.log(result);
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 40,
        bottom:
          Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(height / 5) : height / 5,
        left: width / 40,
        top: height / 40,
      },
    });
  }

  renderContent() {
    const { region } = this.state;
    const data = this.props.navigation.state.params.data;
    //  console.log(`${Number(data.longitude)}, ${Number(data.latitude)}`);
    if (this.state.showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={this.state.region}
        showsUserLocation
        showsMyLocationButton
        loadingEnabled
        ref={mapView => (this.mapView = mapView)}
      >
        <MapView.Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        <MapView.Marker
          title={data.nameOfShop}
          coordinate={{ latitude: Number(data.latitude), longitude: Number(data.longitude) }}
        />
        <MapViewDirections
          origin={{ latitude: region.latitude, longitude: region.longitude }}
          destination={{ latitude: Number(data.latitude), longitude: Number(data.longitude) }}
          apikey={constants.map.GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="purple"
          onReady={(result) => {
            this.fitMapToCoordinates(result);
          }}
        />
      </MapView>
    );
  }

  render() {
    return (
      <Container>
        <Header />
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
};

export default Direction;
