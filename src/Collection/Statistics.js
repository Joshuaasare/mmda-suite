/**
 * @Author: joshuaasare
 * @Date:   2019-02-04 15:58:59
 * @Last modified by:   Joshua Asare
 * @Last modified time: 2019-11-01 17:12:09
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  Container,
  CircularButton,
  Header,
  Icon,
  InteractionManager,
  Center,
  Spinner,
} from '../_shared/components/commons';
import {} from '../_shared/constants';
import { getMidnightDate, getHumanReadableDate } from '../_shared/services';
import { fetchScannedAndTransactionHistory } from './_helpers';

type Props = {
  navigation: Object,
  deviceWidth: Number
};
type State = {
  showSpinner: boolean,
  dateTimePickerVisible: boolean,
  fetchingData: boolean,
  date: string,
  data: Object
};
class Statistics extends Component<Props, State> {
  state = {
    showSpinner: true,
    dateTimePickerVisible: false,
    fetchingData: false,
    date: null,
    data: {},
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const today = new Date();
      const millisecondsDate = Date.parse(getMidnightDate(today));
      this.fetchData(millisecondsDate);
    });
  }

  keyExtractor = item => item.psuedoId.toString();

  async fetchData(millisecondsDate) {
    const data = await fetchScannedAndTransactionHistory(millisecondsDate);
    setTimeout(() => {
      this.setState({
        data,
        showSpinner: false,
        fetchingData: false,
        date: millisecondsDate,
      });
    }, 100);
  }

  handleOnDateCancel() {
    this.setState({ dateTimePickerVisible: false });
  }

  handleOnDateConfirm(date) {
    const millisecondsDate = Date.parse(getMidnightDate(date));
    this.setState({
      dateTimePickerVisible: false,
      fetchingData: true,
      date: millisecondsDate,
    });
    this.fetchData(millisecondsDate);
  }

  renderTotalContent() {
    const { dateTimePickerVisible } = this.state;
    return (
      <View style={styles.total}>
        <View style={styles.dateSelect}>
          <TouchableOpacity
            onPress={() => this.setState({ dateTimePickerVisible: true })}
          >
            <View>
              <View style={styles.containerStyle}>
                <View style={styles.titleViewStyle}>
                  <Text style={styles.titleTextStyle}>Select date</Text>
                </View>
                <View
                  style={{
                    ...styles.subtitleViewStyle,
                    width: this.props.deviceWidth - 190,
                  }}
                >
                  <Text>{getHumanReadableDate(this.state.date)}</Text>
                </View>
              </View>
            </View>
            <DateTimePicker
              isVisible={dateTimePickerVisible}
              onConfirm={date => this.handleOnDateConfirm(date)}
              onCancel={() => this.handleOnDateCancel()}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderScanned(data) {
    return (
      <View style={styles.outer}>
        <View style={styles.iconText}>
          <Icon
            name="dot-single"
            size={30}
            groupName="Entypo"
            color="#3B5FCB"
          />
          <View style={styles.text}>
            <Text style={styles.day}>
              List of Scanned Shops
              {'    '}
            </Text>
            <Text style={styles.date}>
              {getHumanReadableDate(this.state.date)}
            </Text>
          </View>
        </View>
        <View style={styles.timeline}>
          <FlatList
            data={data}
            renderItem={({ item }) => this.renderScannedItem(item)}
            keyExtractor={this.keyExtractor}
            extraData={this.props.deviceWidth}
          />
        </View>
      </View>
    );
  }

  renderScannedItem(item) {
    return (
      <View style={styles.card}>
        <View style={styles.circularButton}>
          <CircularButton borderRadius={20} imageUrl={item.trader.picture} />
        </View>
        <View style={[styles.scanned, { width: this.props.deviceWidth - 150 }]}>
          <Text style={styles.title} numberOfLines={2}>
            {item.trader.nameOfShop}
          </Text>
          <Text style={styles.subtitle}>{item.trader.market.name}</Text>
        </View>
      </View>
    );
  }

  renderTransactions(data) {
    return (
      <View style={styles.outer}>
        <View style={styles.iconText}>
          <Icon
            name="dot-single"
            size={30}
            groupName="Entypo"
            color="#3B5FCB"
          />
          <View style={styles.text}>
            <Text style={styles.day}>
              All Transactions
              {'    '}
            </Text>
            <Text style={styles.date}>
              {getHumanReadableDate(this.state.date)}
            </Text>
          </View>
        </View>
        <View style={styles.timeline}>
          <FlatList
            data={data}
            renderItem={({ item }) => this.renderTransactionItem(item)}
            keyExtractor={this.keyExtractor}
            extraData={this.props.deviceWidth}
          />
        </View>
      </View>
    );
  }

  renderTransactionItem(item) {
    return (
      <View>
        <View style={styles.card}>
          <View style={styles.circularButton}>
            <CircularButton borderRadius={20} imageUrl={item.trader.picture} />
          </View>
          <View
            style={[styles.scanned, { width: this.props.deviceWidth - 210 }]}
          >
            <Text style={styles.title} numberOfLines={2}>
              {item.trader.nameOfShop}
            </Text>
            <Text style={styles.subtitle}>{item.trader.market.name}</Text>
          </View>
          <View style={styles.rightCard}>
            <View style={styles.amount}>
              <Text style={styles.amountTitle}>
                {`GHS ${item.amountPaid.toFixed(2)}`}
              </Text>
              <Text style={styles.subtitle}>Amount</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderContent() {
    const { showSpinner, data } = this.state;
    if (showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {this.renderTotalContent()}
        <ScrollView contentContainerStyle={{}}>
          {this.renderScanned(data.scannedHistory)}
          {this.renderTransactions(data.transactionHistory)}
        </ScrollView>
      </View>
    );
  }

  render() {
    const { fetchingData } = this.state;
    return (
      <Container>
        <Header
          onLeftPressed={() => this.props.navigation.openDrawer()}
          leftContent
          left={<Icon name="ios-menu" size={20} color="white" />}
          leftHeaderText="Collection"
          leftHeaderTextStyle={styles.leftHeaderText}
        />
        <View style={styles.container}>
          {this.renderContent()}
          {fetchingData ? <Spinner overlay /> : null}
        </View>
      </Container>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  outer: {
    // height: 100,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  timeline: {
    borderLeftWidth: 1,
    borderLeftColor: '#666',
    marginLeft: 14,
    paddingLeft: 10,
    paddingTop: 5,
  },
  icon: {
    //  paddingRight: 10,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    height: 75,
    marginHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    elevation: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  date: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  day: {
    fontWeight: 'bold',
    color: '#3B5FCB',
    fontSize: 13,
  },
  text: {
    paddingLeft: 5,
    flexDirection: 'row',
  },
  circularButton: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanned: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'maroon',
  },
  amountTitle: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 13,
  },
  subtitle: {
    fontSize: 11,
    color: '#666',
  },
  rightCard: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  amount: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  dateSelect: {
    height: 40,
    backgroundColor: 'white',
  },
  total: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    //  marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
  },
  titleViewStyle: {
    width: 150,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  subtitleViewStyle: {
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: '#AEB6BF',
  },
  subtitleTextStyle: {},
};

const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
  deviceHeight: state.layout.newLayoutHeight,
});

export default connect(
  mapStateToProps,
  {},
)(Statistics);
