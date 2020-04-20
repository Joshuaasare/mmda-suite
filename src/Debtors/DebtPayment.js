/**
 * @Author: joshuaasare
 * @Date:   2019-04-19 12:31:19
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:01:41
 */

// @flow
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  CircularButton,
  Header,
  Center,
  Spinner,
  InteractionManager,
  Input,
  Button,
  Icon,
} from '../_shared/components/commons';
import { showAlert, confirmPayment } from '../_shared/services';
import { ConfirmModal } from '.';

type Props = {
  navigation: Object,
};
type State = {
  showSpinner: boolean,
  shopData: Object,
  amount: string,
  modalVisible: boolean,
};
class DebtPayment extends Component<Props, State> {
  state = {
    showSpinner: true,
    shopData: {},
    amount: '',
    modalVisible: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const shopData = this.props.navigation.state.params.data;
      this.setState({ shopData, showSpinner: false });
    });
  }

  async onPaymentConfirm(psuedoId) {
    const amount = Number(this.state.amount.trim());
    const { tollCollectorId } = this.props;
    // eslint-disable-next-line
    if (isNaN(amount) || amount === 0) {
      return showAlert('Please enter a valid amount');
    }
    const isDailyToll = 0;
    //  this.setState({ modalVisible: true });
    const shopData = await confirmPayment(psuedoId, tollCollectorId, amount, isDailyToll);
    return this.setState({ shopData });
  }

  amountChanged(amount) {
    this.setState({ amount });
  }

  renderContent() {
    const {
      showSpinner, shopData, modalVisible, amount,
    } = this.state;
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
            <View style={styles.outstandingBox}>
              <View style={styles.amount}>
                <Text style={{ textAlign: 'center' }}>Amount(GHS)</Text>
              </View>
              <View style={styles.inputView}>
                <Input
                  autoFocus
                  keyboardType="numeric"
                  inputStyle={styles.inputStyle}
                  onChangeText={value => this.amountChanged(value)}
                  value={amount}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonsViewStyle}>
            <Button
              onPress={() => this.onPaymentConfirm(shopData.psuedoId)}
              buttonColor="green"
              borderColor="green"
              buttonText="Pay"
              textColor="white"
              rounded
            />
          </View>
        </View>
        <ConfirmModal
          onRequestClose={() => this.setState({ modalVisible: false })}
          onCloseIconPressed={() => this.setState({ modalVisible: false })}
          modalVisible={modalVisible}
        />
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
const styles = {
  container: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  outstandingBox: {
    height: 60,
    width: '85%',
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 3,
  },
  inputView: {
    height: 30,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    paddingHorizontal: 10,
  },
  inputStyle: {
    lineHeight: 15,
    margin: 0,
    padding: 0,
  },
  amount: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsViewStyle: {
    paddingVertical: 10,
    width: '90%',
    flex: 1,
  },
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
};

const mapStateToProps = state => ({
  tollCollectorId: state.profile.id,
});

export default connect(
  mapStateToProps,
  {},
)(DebtPayment);
