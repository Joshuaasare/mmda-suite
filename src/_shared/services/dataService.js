import * as realmSchemas from './realmSchemas';
import { getRealmInstance, getMidnightDate, consoleIndividualRealmObject } from '.';

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
    .objects(realmSchemas.ScannedSchema.name)
    .filtered(`date = ${millisecondsDate} && trader.psuedoId = '${psuedoId}' AND paid = 1`);
  // consoleIndividualRealmObject(results);
  console.log(`paid length: ${results.length}`);
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
  //  console.warn(results);
  // console.log(`scanned length: ${results.length}`);
  consoleIndividualRealmObject(results);
  if (results.length !== 0) return true;
  return false;
};

export async function getTraderDetails(psuedoId: string) {
  const realm = await getRealmInstance();
  const traderDetails = realm
    .objects(realmSchemas.TraderSchema.name)
    .filtered(`psuedoId = '${psuedoId}'`);
  // consoleIndividualRealmObject(traderDetails);
  return traderDetails[0];
}

export async function getTollCollectorDetails(id: Number) {
  const realm = await getRealmInstance();
  const tollCollectorDetails = realm
    .objects(realmSchemas.TollCollectorSchema.name)
    .filtered(`id = ${id}`);
  // consoleIndividualRealmObject(tollCollectorDetails);
  return tollCollectorDetails[0];
}

export async function getMarketSections(marketId: Number) {
  const realm = getRealmInstance();
}
