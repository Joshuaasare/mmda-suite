import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  CircularButton,
  Header,
  Icon,
  Center,
  Spinner,
  EmptyStates,
} from '../_shared/components/commons';
import {} from '../_shared/constants';
import { syncAllData } from '../_shared/services';

type Props = {
  marketTicketPrice: number,
};
type State = {
  syncing: boolean,
  error: boolean,
};
class Sync extends Component<Props, State> {
  state = {
    syncing: true,
    error: false,
  };

  componentDidMount() {
    this.syncData();
  }

  async syncData() {
    this.setState({ syncing: true, error: false });
    const { marketTicketPrice } = this.props;
    const resp = await syncAllData(marketTicketPrice);
    console.log(resp);
    if (resp.error) return this.setState({ error: true, syncing: false });
    return this.setState({ error: false, syncing: false });
  }

  renderContent() {
    const { syncing, error } = this.state;
    if (syncing) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    if (error) {
      return (
        <View style={{ flex: 1 }}>
          <EmptyStates
            imageToUse="error"
            textToUse="Problem Syncing data"
            button
            buttonText="Retry"
            onPress={() => this.syncData()}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <EmptyStates imageToUse="sync" textToUse="Data Synched Succesfully" />
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header />
        {this.renderContent()}
      </Container>
    );
  }
}

const styles = {};

const mapStateToProps = state => ({
  ticketPrice: state.profile.marketTicketPrice,
});

export default connect(
  mapStateToProps,
  {},
)(Sync);
