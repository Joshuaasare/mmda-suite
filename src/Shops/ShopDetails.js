/**
 * @Author: joshuaasare
 * @Date:   2018-12-28 11:00:18
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:03:29
 */

// @flow
import React, { Component } from 'react';
import {
  ScrollView, View, ImageBackground, TouchableOpacity,
} from 'react-native';
import {
  CircularButton,
  FormContainer,
  Header,
  Container,
  Center,
  Spinner,
  Icon,
  InteractionManager,
} from '../_shared/components/commons';
import { getShopDetails } from './_helpers';
import { eventListener, paidForToday } from '../_shared/services';
import { constants } from '../_shared/constants';

type Props = {
  navigation: Object,
  data: Object,
};
type State = {
  shopDetails: Object,
  showSpinner: boolean,
};

class ShopDetails extends Component<Props, State> {
  state: State = {
    shopDetails: {},
    showSpinner: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchShopData(this.props.navigation.state.params.data.psuedoId);

      this.shopsDataUpdated = eventListener.subscribe(
        constants.subscribableEvents.SHOPS_UPDATED,
        () => {
          this.fetchShopData(this.props.navigation.state.params.data.psuedoId);
        },
      );
    });
  }

  componentWillUnmount() {
    eventListener.unsubscribe(constants.subscribableEvents.SHOPS_UPDATED, this.shopsDataUpdated);
  }

  async fetchShopData(psuedoId: string) {
    const shopDetails = await getShopDetails(psuedoId);
    this.setState({ shopDetails, showSpinner: false });
  }

  checkIfPaidForToday(data: Object) {
    if (data.paidForToday === 1) return true;
    return false;
  }

  renderContent() {
    const { shopDetails } = this.state;
    const e1 = paidForToday(shopDetails.psuedoId);
    if (this.state.showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    if (this.state.shopDetails === null) {
      return null;
    }
    return (
      <ScrollView style={styles.mainContainerStyle}>
        <View style={styles.imageViewStyle}>
          <ImageBackground
            style={styles.imageStyle}
            source={{ uri: shopDetails.picture }}
            resizeMode="contain"
          >
            <View style={styles.overlayView} />
          </ImageBackground>
        </View>
        <View style={styles.detailsViewStyle}>
          <FormContainer
            data={[
              {
                title: 'Name of Owners',
                subtitle: `${shopDetails.surname}, ${shopDetails.otherNames}`,
              },
              { title: 'Phone Number', subtitle: shopDetails.phoneNumber },
              { title: 'Gender', subtitle: shopDetails.gender },
            ]}
            sectionHeaderIconName="ios-person"
            sectionHeaderIconSize={16}
            sectionHeaderText="Owner Information"
            sectionHeaderTextStyle={{ fontSize: 16, color: 'purple' }}
          />
          <View style={styles.dividerStyle} />
          <FormContainer
            data={[
              { title: 'Name of Shop', subtitle: shopDetails.nameOfShop },
              { title: 'Market Name', subtitle: shopDetails.market.name },
              { title: 'Market Section', subtitle: shopDetails.section.sectionNumber },
            ]}
            sectionHeaderIconName="md-basket"
            sectionHeaderIconSize={16}
            sectionHeaderText="Shop Information"
            sectionHeaderTextStyle={{ fontSize: 16, color: 'purple' }}
          />
          <View style={styles.dividerStyle} />
          <FormContainer
            data={[
              {
                title: 'Payment Status',
                subtitle: e1 === true ? 'Paid' : 'Not Paid',
                color: e1 === true ? 'green' : 'red',
              },
              { title: 'Amount Owing', subtitle: shopDetails.amountOwing },
            ]}
            sectionHeaderIconName="ios-wallet"
            sectionHeaderIconSize={16}
            sectionHeaderText="Payment Information"
            sectionHeaderTextStyle={{ fontSize: 16, color: 'purple' }}
          />
        </View>
        <View style={styles.iconContainerStyle}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('shopEdit', { shopDetails });
            }}
          >
            <CircularButton
              iconName="md-create"
              borderRadius={27}
              iconColor="white"
              backgroundColor="purple"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <Container>
        <Header
          onLeftPressed={() => this.props.navigation.goBack()}
          leftContent
          left={<Icon groupName="Ionicons" name="ios-arrow-round-back" size={20} color="white" />}
          leftHeaderText="Back"
          leftHeaderTextStyle={styles.leftHeaderText}
        />
        {this.renderContent()}
      </Container>
    );
  }
}

// TODO will have to make a call to the server to fetch the rest of the shop data not found on Card

const styles = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#eee',
    elevation: 5,
    borderColor: '#AEB6BF',
    borderBottomWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
  imageStyle: {
    flex: 1,
    height: undefined,
    width: undefined,
    zIndex: 500,
  },
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  overlayView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  imageViewStyle: {
    height: 200,
    width: '100%',
    //  elevation: 2,
    borderColor: '#AEB6BF',
    borderBottomWidth: 1,
  },
  detailsViewStyle: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  iconContainerStyle: {
    position: 'absolute',
    top: 185,
    right: 20,
    zIndex: 1000,
    flexDirection: 'row',
  },
  dividerStyle: {
    height: 10,
    backgroundColor: '#eee',
  },
};

export default ShopDetails;
