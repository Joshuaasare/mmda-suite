// @flow
import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import {
  Container,
  Header,
  Input,
  ListHeader,
  Button,
  Center,
  Spinner,
  Icon,
  InteractionManager,
} from '../../_shared/components/commons';
import { uploadShopData } from '../_helpers/uploadDataService';

type Props = {
  navigation: Object,
};

type State = {
  shopDetails: Object,
  dataIsValid: boolean,
  showSpinner: boolean,
};

const properties1 = [
  { nameToShow: 'Surname', property: 'surname', editable: true },
  { nameToShow: 'Other Names', property: 'otherNames', editable: true },
  { nameToShow: 'Phone Number', property: 'phoneNumber', editable: true },
  { nameToShow: 'Gender', property: 'gender', editable: true },
];

const properties2 = [
  { nameToShow: 'Name of Shop', property: 'nameOfShop', editable: true },
  {
    nameToShow: 'Market Name',
    property1: 'market',
    property2: 'name',
    editable: false,
  },
  {
    nameToShow: 'Market Section',
    property1: 'section',
    property2: 'sectionNumber',
    editable: false,
  },
];

class ShopEdit extends Component<Props, State> {
  state: State = {
    shopDetails: {},
    dataIsValid: true,
    showSpinner: true,
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        shopDetails: { ...this.props.navigation.state.params.shopDetails },
        showSpinner: false,
      });
    });
  }

  checkIfDataIsValid(value: string, property: string) {
    if (value === '') return false;
    return true;
  }

  updateShopDetails(value: string, property: string) {
    const dataIsValid = this.checkIfDataIsValid(value, property);
    this.setState({
      shopDetails: { ...this.state.shopDetails, [property]: value },
      dataIsValid,
    });
  }

  uploadData() {
    uploadShopData(this.state.shopDetails);
  }

  renderInput(item: Object, i: number, arr: Array<Object>) {
    return (
      <View
        key={i}
        style={i === arr.length - 1 ? styles.lastItemContainerStyle : styles.containerStyle}
      >
        <View style={styles.titleViewStyle}>
          <Text style={styles.titleTextStyle}>{item.nameToShow}</Text>
        </View>
        <View style={styles.subtitleViewStyle}>
          <Input
            inputStyle={item.editable ? null : { color: '#666', opacity: 0.7 }}
            detailsInput
            editable={item.editable}
            value={
              item.property2
                ? this.state.shopDetails[item.property1][item.property2]
                : this.state.shopDetails[item.property]
            }
            onChangeText={value => this.updateShopDetails(value, item.property)}
          />
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
      <ScrollView style={styles.mainContainerStyle}>
        <View style={styles.detailsViewStyle}>
          <View style={styles.container}>
            <View style={styles.sectionHeaderViewStyle}>
              <ListHeader
                style={styles.sectionHeaderTextStyle}
                iconName="ios-person"
                iconSize={20}
                headerText="Owner Information"
              />
            </View>
            {properties1.map((item, i, arr) => this.renderInput(item, i, arr))}
          </View>
          <View style={styles.dividerStyle} />
          <View style={styles.container}>
            <View style={styles.sectionHeaderViewStyle}>
              <ListHeader
                style={styles.sectionHeaderTextStyle}
                iconName="md-basket"
                iconSize={20}
                headerText="Shop Information"
              />
            </View>
            {properties2.map((item, i, arr) => this.renderInput(item, i, arr))}
          </View>
        </View>
        <View style={styles.buttonContainerStyle}>
          <Button
            onPress={() => this.uploadData()}
            buttonColor="purple"
            borderColor="purple"
            textColor="white"
            width={120}
            buttonText="Upload"
            rounded
            disabled={!this.state.dataIsValid}
          />
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
          left={<Icon name="ios-arrow-round-back" groupName="Ionicons" size={20} color="white" />}
          leftHeaderText="Back"
          leftHeaderTextStyle={styles.leftHeaderText}
        />
        {this.renderContent()}
      </Container>
    );
  }
}

const styles = {
  lastItemContainerStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    //  marginBottom: 10,
    flexDirection: 'row',
  },
  containerStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    //  marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
  },
  container: {
    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: 7,
    backgroundColor: 'white',
  },
  sectionHeaderViewStyle: {
    marginBottom: 10,
  },
  detailsViewStyle: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#eee',
  },
  dividerStyle: {
    height: 10,
    backgroundColor: '#eee',
  },
  sectionHeaderTextStyle: {
    fontSize: 16,
    color: 'purple',
  },
  titleViewStyle: {
    justifyContent: 'center',
    width: 120,
  },
  subtitleViewStyle: {
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: '#AEB6BF',
  },
  subtitleTextStyle: {},
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  buttonContainerStyle: {
    alignItems: 'center',
    marginVertical: 5,
  },
};

export default ShopEdit;
