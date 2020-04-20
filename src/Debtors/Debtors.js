/**
 * @Author: joshuaasare
 * @Date:   2019-04-18 12:01:34
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:01:30
 */

import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  InteractionManager,
  Center,
  Spinner,
  ListSeparator,
  Icon,
} from '../_shared/components/commons';
import { getGridColumn } from '../_shared/services';
import { DebtorListItem } from '.';
import { fetchDebtors } from './_helpers';

type Props = {
  deviceWidth: Number,
  navigation: Object,
};
type State = {
  originalList: Array<{}>,
  visibleList: Array<{}>,
  showSpinner: boolean,
};
class App extends Component<Props, State> {
  state = {
    originalList: [],
    visibleList: [],
    showSpinner: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      await this.fetchData();
    });
  }

  keyExtractor = item => `${item.key}`;

  async fetchData() {
    const data = await fetchDebtors();
    this.setState({ originalList: data, visibleList: data, showSpinner: false });
  }

  renderItem(item, index) {
    const { deviceWidth, navigation } = this.props;
    return (
      <DebtorListItem
        item={item}
        index={index}
        deviceWidth={deviceWidth}
        onPress={() => navigation.navigate('debtPayment', { data: item })}
      />
    );
  }

  renderContent() {
    const { deviceWidth } = this.props;
    const { showSpinner, visibleList, originalList } = this.state;
    if (showSpinner) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return (
      <FlatList
        renderItem={({ item, index }) => this.renderItem(item, index)}
        data={visibleList}
        style={styles.container}
        numColumns={getGridColumn(deviceWidth)}
        extraData={this.props.deviceWidth}
        key={deviceWidth}
        keyExtractor={item => this.keyExtractor(item)}
        ItemSeparatorComponent={ListSeparator}
      />
    );
  }

  render() {
    return (
      <Container>
        <Header
          onLeftPressed={() => this.props.navigation.openDrawer()}
          leftContent
          left={<Icon name="ios-menu" size={20} color="white" />}
          leftHeaderText="Pay Debt"
          leftHeaderTextStyle={styles.leftHeaderText}
        />
        {this.renderContent()}
      </Container>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  leftHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
};

const mapStateToProps = state => ({
  deviceWidth: state.layout.newLayoutWidth,
  deviceHeight: state.layout.newLayoutHeight,
});

export default connect(
  mapStateToProps,
  {},
)(App);
