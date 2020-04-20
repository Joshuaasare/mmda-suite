import { PermissionsAndroid } from 'react-native';

export async function requestCameraPermissions() {
  try {
    const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (response === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}
