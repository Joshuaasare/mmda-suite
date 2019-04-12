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
      <View style={styles.itemViewStyle} key={i}>
        <CircularButton imageUrl={item.picture} borderRadius={25} />
        <View style={[styles.textViewStyle, { width: this.props.deviceWidth - 180 }]}>
          <Text style={styles.shopNameTextStyle}>{item.nameOfShop}</Text>
          <Text style={[{ color: e1 ? 'green' : 'red' }, styles.textStyle]}>
            {e1 ? 'Scanned' : 'Not Scanned'}
          </Text>
          <Text style={[{ color: e2 ? 'green' : 'red' }, styles.textStyle]}>
            {e2 ? 'Paid' : 'Not Paid'}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('direction', { data: item });
            }}
          >
            <CircularButton
              borderRadius={25}
              iconName="gps-fixed"
              iconColor="white"
              backgroundColor="purple"
              groupName="MaterialIcons"
            />
          </TouchableOpacity>
        </View>
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
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
    backgroundColor: 'white',
  },
  itemViewStyle: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#E4E4E4',
    height: 80,
    width: '90%',
    alignItems: 'center',
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
};

const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
});

export default connect(mapStateToProps)(Summary);
