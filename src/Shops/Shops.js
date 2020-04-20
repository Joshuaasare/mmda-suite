/**
 * @Author: joshuaasare
 * @Date:   2018-12-27 00:23:10
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:04:00
 */

// @flow
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {
  Header,
  Container,
  Icon,
  Spinner,
  Center,
  InteractionManager,
} from '../_shared/components/commons';
import ShopCard from './ShopCard';
import { getShopsData, eventListener } from '../_shared/services';
import { constants } from '../_shared/constants';
import { Trader } from '../_shared/schemaTypes';

type Props = {
  navigation: Object,
};

type State = {
  showSearchBar: boolean,
  shopData: Array<Object>,
  showSpinner: boolean,
};

class Shops extends Component<Props, State> {
  state: State = {
    showSearchBar: false,
    shopData: [],
    showSpinner: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchShopsData();
      this.shopsDataUpdated = eventListener.subscribe(
        constants.subscribableEvents.SHOPS_UPDATED,
        () => {
          this.fetchShopsData();
        },
      );
    });
  }

  componentWillUnmount() {
    eventListener.unsubscribe(constants.subscribableEvents.SHOPS_UPDATED, this.shopsDataUpdated);
  }

  keyExtractor = (item: Trader) => item.psuedoId.toString();

  shopsDataUpdated: any;

  async fetchShopsData() {
    const shopData = await getShopsData();
    this.setState({ shopData, showSpinner: false });
  }

  renderContent() {
    if (this.state.showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return (
      <FlatList
        data={this.state.shopData}
        renderItem={({ item }) => (
          <ShopCard
            iconName="ios-arrow-round-forward"
            borderRadius={20}
            iconColor="black"
            backgroundColor="white"
            data={item}
            onIconPressed={() => this.props.navigation.navigate('shopDetails', { data: item })}
          />
        )}
        keyExtractor={this.keyExtractor}
      />
    );
  }

  // TODO: since tin number will not always be available we should find a
  // reliable keyExtractor
  render() {
    return (
      <Container>
        <View style={styles.mainContainerStyle}>
          <Header
            onLeftPressed={() => this.props.navigation.openDrawer()}
            leftContent
            left={<Icon name="ios-menu" size={20} color="white" groupName="Ionicons" />}
            leftHeaderText="Shops"
            leftHeaderTextStyle={styles.leftHeaderText}
            onRightPressed={() => this.setState({ showSearchBar: true })}
            rightContent
            right={<Icon name="search" size={25} color="white" groupName="EvilIcons" />}
            rightHeaderTextStyle={styles.rightHeaderText}
            showSearchBar={this.state.showSearchBar}
            onBackIconPress={() => {
              this.setState({ showSearchBar: false });
            }}
          />
          {this.renderContent()}
        </View>
      </Container>
    );
  }
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    paddingBottom: 15,
  },
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  rightHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
  },
  rightImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
};

export default Shops;
