/**
 * @Author: joshuaasare
 * @Date:   2019-04-12 21:07:33
 * @Last modified by:   Joshua Asare
 * @Last modified time: 2019-11-01 17:11:43
 */

import forEach from 'lodash/forEach';
import axios from 'axios';
import { getRealmInstance } from './storageService';
import * as realmSchemas from './realmSchemas';
import { constants } from '../constants';

const schemas = [
  'Scanned',
  'Transaction',
  'Trader',
  'TollCollector',
  'Section',
  'SectionalHead',
  'RevenueHead',
  'Market',
  'Assembly',
];

export async function deleteAllData() {
  const realm = await getRealmInstance();
  realm.write(() => {
    for (let i = 0; i < schemas.length; i += 1) {
      realm.delete(realm.objects(schemas[i]));
    }
  });
  return null;
}

export async function convertTransactionDataToServer(results) {
  const transactions = [];
  forEach(results, (result) => {
    const transaction = {
      psuedoId: result.psuedoId,
      assemblyId: result.assembly.id,
      marketId: result.market.id,
      sectionId: 1,
      tollCollectorId: result.tollCollector.id,
      traderId: result.trader.psuedoId,
      millisecondsDate: result.date,
      amountPaid: result.amountPaid,
      isDailyToll: result.isDailyToll,
    };
    transactions.push(transaction);
  });
  return transactions;
}
export async function convertScannedDataToServer(results) {
  const scans = [];
  forEach(results, (result) => {
    const scan = {
      psuedoId: result.psuedoId,
      traderId: result.trader.psuedoId,
      tollCollectorId: result.tollCollector.id,
      marketId: result.market.id,
      assemblyId: result.assembly.id,
      sectionId: 1,
      millisecondsDate: result.date,
    };
    scans.push(scan);
  });
  return scans;
}

export async function syncAllData(marketTicketPrice) {
  const realm = await getRealmInstance();
  const scannedResultsToSync = realm
    .objects(realmSchemas.ScannedSchema.name)
    .filtered('isUpdated = false');
  const transactionResultsToSync = realm
    .objects(realmSchemas.TransactionSchema.name)
    .filtered('isUpdated = false');
  const scannedResultsInServerFormat = scannedResultsToSync.length > 0
    && (await convertScannedDataToServer(scannedResultsToSync));
  //  console.log(scannedResultsToSync);
  const transactionResultsInServerFormat = transactionResultsToSync.length > 0
    && (await convertTransactionDataToServer(transactionResultsToSync));
  try {
    scannedResultsToSync.length > 0
      && forEach(scannedResultsInServerFormat, async (result) => {
        const resp = await axios.post(
          `${constants.api.ROOT_URL}/transaction/scan`,
          {
            scannedDataInServerFormat: result,
            ticketPrice: marketTicketPrice,
          },
        );
        console.log(resp);
      });
    transactionResultsToSync.length > 0
      && forEach(transactionResultsInServerFormat, async (result) => {
        const resp = await axios.post(
          `${constants.api.ROOT_URL}/transaction/payment`,
          {
            transactionDataInServerFormat: result,
            ticketPrice: marketTicketPrice,
          },
        );
        console.log(resp);
      });
    return { success: 'success' };
  } catch (err) {
    console.log(err);
    return {
      error: {
        status: 1,
      },
    };
  }
}
