import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { AuthScreen, SyncUserData, AuthLoadingScreen } from './Auth';
import { ShopEdit, ShopDetails, Shops } from './Shops';
import {
  Summary, Map, Statistics, Direction,
} from './Collection';
import { Debtors, DebtPayment } from './Debtors';
import { Camera, ScanPayment } from './QRScan';
import { Sync } from './Sync';
import { DrawerSideBar, TabBarComponent, Icon } from './_shared/components/commons';

export const CollectionPages = createBottomTabNavigator(
  {
    summary: {
      screen: Summary,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-information-circle" size={20} groupName="Ionicons" color={tintColor} />
        ),
        title: 'Summary',
      },
    },
    map: {
      screen: Map,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="map-marker-radius"
            size={20}
            groupName="MaterialCommunityIcons"
            color={tintColor}
          />
        ),
        title: 'Map',
      },
    },
    statistics: {
      screen: Statistics,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="pie-chart" size={20} groupName="FontAwesome" color={tintColor} />
        ),
        title: 'Statistics',
      },
    },
  },
  {
    tabBarComponent: TabBarComponent,
    initialRouteName: 'summary',
    //  initialRouteName: 'statistics',
  },
);

export const DrawerPages = createDrawerNavigator(
  {
    Shops: {
      screen: Shops,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="shop" size={18} groupName="Entypo" color="white" />
        ),
        title: 'Shops',
      },
    },

    CollectionPages: {
      screen: CollectionPages,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="calendar-today" size={18} groupName="MaterialCommunityIcons" color="white" />
        ),
        title: 'Collection',
      },
    },
    Camera: {
      screen: Camera,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="qrcode-scan" size={18} groupName="MaterialCommunityIcons" color="white" />
        ),
        title: 'Scan Code',
      },
    },
    Debtors: {
      screen: Debtors,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="money" size={18} groupName="FontAwesome" color="white" />
        ),
        title: 'Pay Debt',
      },
    },
    Sync: {
      screen: Sync,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-sync" size={18} groupName="Ionicons" color="white" />
        ),
        title: 'Sync Data',
      },
    },
  },
  {
    contentComponent: DrawerSideBar,
    initialRouteName: 'Shops',
    //  initialRouteName: 'CollectionPages',
    //  initialRouteName: 'Camera',
  },
);

export const Navigator = createStackNavigator({
  authLoading: { screen: AuthLoadingScreen, navigationOptions: { header: null } },
  auth: { screen: AuthScreen, navigationOptions: { header: null } },
  sync: { screen: SyncUserData, navigationOptions: { header: null } },
  drawerPages: { screen: DrawerPages, navigationOptions: { header: null } },
  shopDetails: { screen: ShopDetails, navigationOptions: { header: null } },
  shopEdit: { screen: ShopEdit, navigationOptions: { header: null } },
  direction: { screen: Direction, navigationOptions: { header: null } },
  scanPayment: { screen: ScanPayment, navigationOptions: { header: null } },
  debtPayment: { screen: DebtPayment, navigationOptions: { header: null } },
  //  collectionPages: { screen: CollectionPages, navigationOptions: { header: null } },
});
