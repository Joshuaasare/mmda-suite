/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Loader } from '../_shared/components/commons';
import { setAsCompletedSetup, populateLocalDb } from '../_shared/services';

type Props = {
  navigation: Object,
};
type State = {
  showModal: boolean,
};
class SyncUserData extends Component<Props, State> {
  state: State = {
    showModal: true,
  };

  componentDidMount() {
    //  setTimeout(() => {
    this.fetchData();
    //  }, 300);
  }

  async fetchData() {
    console.log('1completed Setup, Going to drawer pages');
    const isCompletedSetup = await populateLocalDb();
    if (isCompletedSetup) {
      await setAsCompletedSetup();
      this.setState({ showModal: false });
      return this.props.navigation.replace('drawerPages');
    }
    this.setState({ showModal: false });
    console.warn('could not complete setup');
    return null;
  }

  renderContent() {
    return (
      <Loader
        modalVisible={this.state.showModal}
        animationType="fade"
        loaderText="Loading data, please wait...."
      />
    );
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

export default SyncUserData;
