/* @flow */

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import {
  Container,
  Header,
  CircularButton,
  Button,
  InteractionManager,
  Spinner,
  Center,
  Icon,
} from '../_shared/components/commons';
import { processBarCodeRead, checkIfShopIsScanned } from './_helpers';
import { confirmPayment } from '../_shared/services';

type Props = {
  navigation: Object,
  ticketPrice: Number,
};
type State = {
  showSpinner: boolean,
  shopData: Object,
  onCompleteScanPayment: boolean,
  paymentPending: boolean,
  isScanned: boolean,
};
class ScanPayment extends Component<Props, State> {
  state = {
    showSpinner: true,
    shopData: {},
    onCompleteScanPayment: false,
    paymentPending: false,
    isScanned: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const { psuedoId, tollCollectorId, ticketPrice } = this.props.navigation.state.params;
      await this.onBarCodeRead(psuedoId, tollCollectorId, ticketPrice);
    });
  }

  async onBarCodeRead(psuedoId: string, tollCollectorId: Number, ticketPrice: Number) {
    const checkScannedResponse = await checkIfShopIsScanned(psuedoId);
    // console.log(checkScannedResponse);
    if (checkScannedResponse.isScanned) {
      return this.setState({
        shopData: checkScannedResponse.shopData,
        isScanned: true,
        onCompleteScanPayment: true,
        showSpinner: false,
      });
    }
    const shopData = await processBarCodeRead(psuedoId, tollCollectorId, ticketPrice);
    return this.setState({ showSpinner: false, shopData });
  }

  onDeferPressed() {
    showMessage({
      message: 'Payment Deffered',
      type: 'info',
      color: 'white',
      backgroundColor: 'maroon',
    });
    this.setState({ onCompleteScanPayment: true });
  }

  async onConfirmPressed() {
    const { psuedoId, tollCollectorId, ticketPrice } = this.props.navigation.state.params;
    this.setState({ paymentPending: true });
    const isDailyToll = 1;
    const shopData = await confirmPayment(psuedoId, tollCollectorId, ticketPrice, isDailyToll);
    showMessage({
      message: 'Payment Confirmed',
      type: 'success',
      color: 'white',
      backgroundColor: 'green',
    });
    this.setState({ paymentPending: false, shopData, onCompleteScanPayment: true });
  }

  renderContent() {
    const {
      showSpinner, shopData, onCompleteScanPayment, isScanned,
    } = this.state;
    const { ticketPrice } = this.props.navigation.state.params;
    const stringedMarketPrice = ticketPrice.toFixed(2);
    if (showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.circularImageView}>
            <CircularButton imageUrl={shopData.picture} borderRadius={60} />
          </View>
          <View style={styles.textViewStyle}>
            <Text style={{ fontWeight: 'bold' }}>{shopData.nameOfShop}</Text>
            {onCompleteScanPayment ? (
              <View>
                {isScanned ? (
                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text>This shop has already been scanned</Text>
                    <View style={styles.iconViewStyle}>
                      <Icon name="ios-checkmark-circle" size={25} color="green" />
                    </View>
                  </View>
                ) : null}
                <View style={styles.outstandingBox}>
                  <View>
                    <Text>Outstanding</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: shopData.amountOwing > 0 ? 'maroon' : 'green',
                      }}
                    >
                      {`GHS ${shopData.amountOwing.toFixed(2)}`}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.marketPriceView}>
                <Text style={styles.amount}>{`GHS: ${stringedMarketPrice}`}</Text>
                <View style={styles.buttonsViewStyle}>
                  <View style={styles.btn}>
                    <Button
                      onPress={() => this.onConfirmPressed()}
                      buttonColor="green"
                      borderColor="green"
                      buttonText="Confirm"
                      textColor="white"
                      rounded
                    />
                  </View>

                  <View style={styles.btn}>
                    <Button
                      onPress={() => this.onDeferPressed()}
                      buttonColor="maroon"
                      borderColor="maroon"
                      buttonText="Defer"
                      textColor="white"
                      rounded
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
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
        {this.state.paymentPending ? <Spinner overlay /> : null}
      </Container>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 20,
    alignItems: 'center',
    elevation: 2,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  circularImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textViewStyle: {
    marginVertical: 2,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsViewStyle: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  amount: {
    color: 'maroon',
    fontWeight: 'bold',
  },
  outstandingBox: {
    marginVertical: 20,
    height: 60,
    width: '80%',
    paddingVertical: 15,
    marginHorizontal: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 3,
  },
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  marketPriceView: {
    alignItems: 'center',
    marginTop: 10,
  },
  iconViewStyle: {
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ScanPayment;
