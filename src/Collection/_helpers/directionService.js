import { PermissionsAndroid, Platform, PixelRatio } from 'react-native';
import axios from 'axios';
import { constants } from '../../_shared/constants';

export async function requestLocationPermissions() {
  try {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (response === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export function getPixelSizeForLayoutSize(dimension) {
  const val = Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(dimension / 6) : dimension / 6;
  return val;
}

export function checkIfShopLocationExist(data) {
  if (data.latitude && data.longitude) return true;
  return false;
}

export async function getRealTimeDurationAndDistance(coordinates) {
  let origin;
  let destination;
  const waypoints = '';
  const language = 'en';
  const mode = coordinates.mode;
  if (coordinates.origin.latitude && coordinates.origin.longitude) {
    origin = `${coordinates.origin.latitude},${coordinates.origin.longitude}`;
  }

  if (coordinates.destination.latitude && coordinates.destination.longitude) {
    destination = `${coordinates.destination.latitude},${coordinates.destination.longitude}`;
  }
  try {
    const url = `${
      constants.map.GOOGLE_DIRECTIONS_BASE_URL
    }?origin=${origin}&waypoints=${waypoints}&destination=${destination}&key=${
      constants.map.GOOGLE_MAPS_API_KEY
    }&mode=${mode}&language=${language}`;
    const resp = await axios.get(url);

    return {
      distance: resp.data.routes[0].legs[0].distance.text,
      duration: resp.data.routes[0].legs[0].duration.text,
    };
  } catch (error) {
    return { error };
  }
}
