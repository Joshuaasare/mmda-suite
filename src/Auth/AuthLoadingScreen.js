// @flow
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  hasLoggedIn,
  getUserDataWithoutPhoneAndPin,
  hasCompletedSetup,
  getMarketSections,
  //  setAsNotCompletedSetup,
  //  removeAllLoginCache,
} from '../_shared/services';
import { loadUserData } from '../_shared/actions/profile_action';

type Props = {
  navigation: Object,
  loadUserData: () => void,
};

type State = {};

class AuthLoadingScreen extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    //  setAsNotCompletedSetup();
    //  removeAllLoginCache();
    this.checkIfLoggedIn();
  }

  async checkIfLoggedIn() {
    if (await hasLoggedIn()) {
      const userData = await getUserDataWithoutPhoneAndPin();
      console.log(userData);
      this.props.loadUserData(userData);
      /** Mr. Yankey loaded his userdata into redux
       ** not sure if this is necessary yet
       * */
      const setupComplete = await hasCompletedSetup();
      if (setupComplete) {
        //  const marketSections = await getMarketSections(userData.marketId);
        // some app settings things, will come here soon
        return this.props.navigation.replace('drawerPages');
      }
      return this.props.navigation.replace('sync');
      // complete the setup by loading all the data into realm
    }
    console.log('going to auth');
    return this.props.navigation.replace('auth');
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  { loadUserData },
)(AuthLoadingScreen);
