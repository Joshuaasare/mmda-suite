import { AsyncStorage, Alert } from 'react-native';
import { constants } from '../_shared/constants';
import { deleteUserVerificationCode } from '../_shared/services';

export async function runAttemptsCheckAlgorithm(swipe, message) {
  const phone = await AsyncStorage.getItem(constants.auth.USER_PHONE_NUMBER);
  const attempts = await AsyncStorage.getItem(constants.auth.USER_LOGIN_ATTEMPTS);
  //  console.warn(`${phone}${attempts}`);
  if (attempts === '0') {
    Alert.alert(
      message,
      'You have exhausted all your attempts',
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteUserVerificationCode(phone);
              return swipe.scrollBy(-1);
            } catch (e) {
              return swipe.scrollBy(-1);
            }
          },
        },
      ],
      { cancelable: false },
    );
  } else if (attempts === '1') {
    Alert.alert(
      message,
      `You have ${attempts} attempt left`,
      [
        {
          text: 'OK',
          onPress: () => {
            let temp = Number(attempts);
            temp -= 1;
            AsyncStorage.setItem(constants.auth.USER_LOGIN_ATTEMPTS, `${temp}`);
          },
        },
      ],
      { cancelable: false },
    );
  } else {
    Alert.alert(
      message,
      `You have ${attempts} attempts left`,
      [
        {
          text: 'OK',
          onPress: () => {
            let temp = Number(attempts);
            temp -= 1;
            AsyncStorage.setItem(constants.auth.USER_LOGIN_ATTEMPTS, `${temp}`);
          },
        },
      ],
      { cancelable: false },
    );
  }
}
