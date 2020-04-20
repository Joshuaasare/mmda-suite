/**
 * @Author: joshuaasare
 * @Date:   2019-04-19 10:42:08
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:01:14
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getGridColumn } from '../_shared/services';
import { CircularButton } from '../_shared/components/commons';

type Props = {
  deviceWidth: Number,
  index: Number,
  item: Object,
  onPress: () => void,
};

const DebtorListItem = (props: Props) => (
  <View
    style={[
      styles.item,
      {
        height: Math.floor(props.deviceWidth / getGridColumn(props.deviceWidth)),
        flex: 1 / getGridColumn(props.deviceWidth),
      },
      props.index % 2 === 0
        ? { borderLeftWidth: 0.7, borderColor: '#eee', borderRightWidth: 0.7 }
        : null,
    ]}
  >
    <TouchableOpacity style={styles.center} onPress={props.onPress}>
      <CircularButton imageUrl={props.item.picture} borderRadius={30} />
      <View style={styles.textView}>
        <Text style={styles.shopName}>{props.item.nameOfShop}</Text>
        <Text style={styles.amount}>{`GHS ${props.item.amountOwing.toFixed(2)}`}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = {
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1 / 2,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  amount: {
    color: 'maroon',
  },
};

export default DebtorListItem;
