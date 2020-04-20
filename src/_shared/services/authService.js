/**
 * @Author: joshuaasare
 * @Date:   2019-02-19 19:16:17
 * @Last modified by:   Joshua Asare
 * @Last modified time: 2019-11-01 17:11:47
 */

import { Platform, AsyncStorage } from 'react-native';
import * as KeyChain from 'react-native-keychain';
import axios from 'axios';
import { constants } from '../constants';

export async function storeUserData(userData) {
  if (Platform.OS === 'ios' || Platform.Version > 23) {
    const password = JSON.stringify(userData);
    const username = userData.phone;
    await KeyChain.setGenericPassword(username, password);
  } else {
    await AsyncStorage.setItem(constants.auth.USER_DATA, JSON.stringify(userData));
  }
}

export async function hasLoggedIn() {
  const loggedIn = await AsyncStorage.getItem(constants.auth.HAS_LOGGED_IN);
  if (loggedIn === 'true') return true;
  return false;
}

export async function hasCompletedSetup() {
  const completedSetup = await AsyncStorage.getItem(constants.auth.HAS_COMPLETED_SETUP);
  if (completedSetup === 'true') return true;
  return false;
}

export async function getUserDataWithoutPhoneAndPin() {
  let userData;
  if (Platform.OS === 'ios' || Platform.Version > 23) {
    userData = await KeyChain.getGenericPassword();
    if (userData) return JSON.parse(userData.password);
  } else {
    userData = await AsyncStorage.getItem(constants.auth.USER_DATA);
    if (userData) return JSON.parse(userData);
  }
  return null;
}

export async function requestCode(phone, pin) {
  try {
    /* since we are using a two-factor authentication, there
     *is no need to check the offline details to authenticate
     */
    const resp = await axios.post(`${constants.api.ROOT_URL}/code/request`, {
      phone,
      pin,
    });
    if (!resp.error) return resp;
    //
  } catch (error) {
    return { error: error.response.data.error };
  }
  return null;
}

export async function setUserPhoneAndLoginAttempts(phone) {
  const attempts = constants.auth.NUMBER_OF_ATTEMPTS;
  AsyncStorage.setItem(constants.auth.USER_PHONE_NUMBER, phone);
  AsyncStorage.setItem(constants.auth.USER_LOGIN_ATTEMPTS, attempts);
  return null;
}

export async function verifyCode(code) {
  try {
    const phone = await AsyncStorage.getItem(constants.auth.USER_PHONE_NUMBER);
    const resp = await axios.post(`${constants.api.ROOT_URL}/code/verify`, {
      code,
      phone,
    });
    if (!resp.error) {
      storeUserData(resp.data.userData);
      return resp;
    }
  } catch (error) {
    return { error: error.response.data.error };
  }
  return null;
}

export async function deleteUserVerificationCode() {
  try {
    const phone = await AsyncStorage.getItem(constants.auth.USER_PHONE_NUMBER);
    await axios.post(`${constants.api.ROOT_URL}/code/delete`, {
      phone,
    });
    return null;
  } catch (error) {
    return { error: error.response.data.error };
  }
}

export async function resendUserVerificationCode() {
  try {
    const phone = await AsyncStorage.getItem(constants.auth.USER_PHONE_NUMBER);
    const resp = await axios.post(`${constants.api.ROOT_URL}/code/resend`, {
      phone,
    });
    return resp;
  } catch (error) {
    return { error: error.response.data.error };
  }
}

export async function setUserAsLoggedIn() {
  AsyncStorage.setItem(constants.auth.HAS_LOGGED_IN, 'true');
}

export async function setAsCompletedSetup() {
  AsyncStorage.setItem(constants.auth.HAS_COMPLETED_SETUP, 'true');
}

export async function setAsNotCompletedSetup() {
  AsyncStorage.removeItem(constants.auth.HAS_COMPLETED_SETUP);
}

export async function setUserAsLoggedOut() {
  await AsyncStorage.removeItem(constants.auth.HAS_LOGGED_IN);
}

export async function removeAllLoginCache() {
  console.log('removing log in cache');
  await AsyncStorage.clear();
  await KeyChain.resetGenericPassword();
  return null;
}
