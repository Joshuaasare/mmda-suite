import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';
import { getShopsData } from '../../_shared/services';

export async function fetchAllShopCoordinatesAndData() {
  const newShopsData = [];
  const newShopsCoordinates = [];
  const allShopsData = await getShopsData();
  for (let i = 0; i < allShopsData.length; i += 1) {
    const latitude = allShopsData[i].latitude;
    const longitude = allShopsData[i].longitude;
    if (latitude !== '' && longitude !== '' && (latitude && longitude)) {
      const latlng = {
        latitude: Number(latitude),
        longitude: Number(longitude),
      };
      const shopData = allShopsData[i];
      newShopsCoordinates.push(latlng);
      newShopsData.push(shopData);
    }
  }
  return { newShopsCoordinates, newShopsData };
}

export const fetchGeolocation = () => {
  if (Platform.OS === 'ios' || Platform.Version > 17) {
    return Geolocation;
  }
  return navigator.geolocation;
};
