/**
 * @Author: joshuaasare
 * @Date:   2019-03-02 10:23:54
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:05:20
 */

import * as realmSchemas from './realmSchemas';
import { getRealmInstance, getMidnightDate } from '.';

export async function getShopsData() {
  const realm = getRealmInstance();
  return realm.objects(realmSchemas.TraderSchema.name);
}

export async function getTransactions(tollCollectorId: Number) {
  const realm = await getRealmInstance();
  return realm.objects(realmSchemas.TransactionSchema.name).filtered();
}

export const paidForToday = (psuedoId: string) => {
  const realm = getRealmInstance();
  const today = new Date();
  const millisecondsDate = Date.parse(getMidnightDate(today));
  const results = realm
    .objects(realmSchemas.TransactionSchema.name)
    .filtered(`date = ${millisecondsDate} && trader.psuedoId = '${psuedoId}' AND isDailyToll = 1`);
  if (results.length !== 0) return true;
  return false;
};

export const scannedForToday = (psuedoId: string) => {
  const realm = getRealmInstance();
  const today = new Date();
  const millisecondsDate = Date.parse(getMidnightDate(today));
  const results = realm
    .objects(realmSchemas.ScannedSchema.name)
    .filtered(`date = ${millisecondsDate} && trader.psuedoId = '${psuedoId}'`);
  if (results.length !== 0) return true;
  return false;
};

export async function getTraderDetails(psuedoId: string) {
  const realm = await getRealmInstance();
  const traderDetails = realm
    .objects(realmSchemas.TraderSchema.name)
    .filtered(`psuedoId = '${psuedoId}'`);
  return traderDetails[0];
}

export async function getTollCollectorDetails(id: Number) {
  const realm = await getRealmInstance();
  const tollCollectorDetails = realm
    .objects(realmSchemas.TollCollectorSchema.name)
    .filtered(`id = ${id}`);
  return tollCollectorDetails[0];
}

export async function getMarketSections(marketId: Number) {
  const realm = getRealmInstance();
}
