/**
 * @Author: Joshua Asare
 * @Date:   2019-02-04 15:57:41
 * @Last modified by:   Joshua Asare
 * @Last modified time: 2019-11-01 17:12:20
 */

/* @flow */
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Center,
  Spinner,
  CircularButton,
  Icon,
  InteractionManager,
} from '../_shared/components/commons';
import { getShopsData, scannedForToday, paidForToday } from '../_shared/services';

type Props = {
  deviceWidth: number,
  navigation: Object,
};
type State = {
  showSpinner: boolean,
  showSearchBar: boolean,
  shopDetails: Array<Object>,
};
class Summary extends Component<Props, State> {
  state = {
    showSpinner: true,
    shopDetails: [],
    showSearchBar: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchShopsData();
    });
  }

  async fetchShopsData() {
    const shopDetails = await getShopsData();
    this.setState({ shopDetails, showSpinner: false });
  }

  renderItem(item, i) {
    const e1 = scannedForToday(item.psuedoId);
    const e2 = paidForToday(item.psuedoId);
    return (
      <View
        style={[
          styles.itemViewStyle,
          e1 ? { borderLeftColor: 'green' } : { borderLeftColor: 'maroon' },
        ]}
        key={i}
      >
        <CircularButton imageUrl={item.picture} borderRadius={25} />
        <View style={[styles.textViewStyle, { width: this.props.deviceWidth - 180 }]}>
          <Text style={styles.shopNameTextStyle}>{item.nameOfShop}</Text>
          <Text style={[{ color: e1 ? 'green' : 'maroon' }, styles.textStyle]}>
            {e1 ? 'Scanned' : 'Not Scanned'}
          </Text>
          <View style={styles.outstandingBox}>
            <Text
              style={{
                fontWeight: 'bold',
                color: item.amountOwing > 0 ? 'maroon' : 'green',
              }}
            >
              {`GHS ${item.amountOwing.toFixed(2)}`}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('direction', { data: item });
            }}
          >
            <CircularButton
              borderRadius={25}
              iconName="direction"
              iconColor="black"
              backgroundColor="#F5F5F5"
              groupName="Entypo"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderAccounts() {
    return (
      <View style={styles.accountCard}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', fontSize: 13 }}>Amount Collected</Text>
          <View style={styles.iconViewStyle}>
            <Icon name="ios-wallet" size={20} color="white" />
          </View>
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>GHS 200</Text>
      </View>
    );
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
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.accountsView}>{this.renderAccounts()}</View>
        {this.state.shopDetails.map((item, i, arr) => this.renderItem(item, i, arr))}
      </ScrollView>
    );
  }

  render() {
    return (
      <Container>
        <Header
          onLeftPressed={() => this.props.navigation.openDrawer()}
          leftContent
          left={<Icon name="ios-menu" size={20} color="white" />}
          leftHeaderText="Collection"
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
        <View style={styles.container}>{this.renderContent()}</View>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  itemViewStyle: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 100,
    alignItems: 'center',
    borderLeftWidth: 5,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  textViewStyle: {
    marginVertical: 2,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  shopNameTextStyle: {
    //  color: 'white',
    fontSize: 13,
    fontWeight: '800',
    //  numberOfLines: 2,
  },
  textStyle: {
    fontSize: 12,
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
  accountsView: {
    paddingVertical: 5,
  },
  accountCard: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 2,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#6C40BE',
  },
  iconViewStyle: {
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outstandingBox: {
    marginVertical: 5,
    height: 30,
    width: 100,
    paddingVertical: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 3,
  },
};

const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
});

export default connect(mapStateToProps)(Summary);
