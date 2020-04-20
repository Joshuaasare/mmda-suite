import axios from 'axios';
import uuidV4 from 'uuid/v4';
import * as realmSchemas from './realmSchemas';
import {
  getTraderDetails,
  getMidnightDate,
  getTollCollectorDetails,
  getRealmInstance,
  consoleIndividualRealmObject,
} from '.';
import { constants } from '../constants';

export async function convertTransactionDataToServerFormat(
  traderDetails,
  tollCollectorId,
  transactionUUID,
  amountPaid,
  isDailyToll,
) {
  const today = new Date();
  const millisecondsDate = Date.parse(getMidnightDate(today));
  const serverData = {
    psuedoId: transactionUUID,
    assemblyId: traderDetails.assembly.id,
    marketId: traderDetails.market.id,
    sectionId: traderDetails.section.id,
    tollCollectorId,
    traderId: traderDetails.psuedoId,
    millisecondsDate,
    amountPaid,
    isDailyToll,
  };
  return serverData;
}

export async function convertTransactionDataToRealmObject(
  traderDetails,
  tollCollectorId,
  transactionUUID,
  amountPaid,
  isDailyToll,
) {
  const today = new Date();
  const millisecondsDate = Date.parse(getMidnightDate(today));
  const realmData = {
    psuedoId: transactionUUID,
    assembly: traderDetails.assembly,
    market: traderDetails.market,
    sectionId: traderDetails.section,
    tollCollector: await getTollCollectorDetails(tollCollectorId),
    trader: traderDetails,
    date: millisecondsDate,
    amountPaid,
    isDailyToll,
  };
  return realmData;
}

export async function saveTransactionDataLocally(transactionDataInRealmObject, traderIsUpdated) {
  try {
    consoleIndividualRealmObject(transactionDataInRealmObject);
    //   console.log(transactionDataInRealmObject);
    const realm = await getRealmInstance();
    const traderObjectToModify = realm
      .objects(realmSchemas.TraderSchema.name)
      .filtered(`psuedoId = '${transactionDataInRealmObject.trader.psuedoId}'`)[0];
    // console.log(traderObjectToModify);
    realm.write(() => {
      realm.create(realmSchemas.TransactionSchema.name, transactionDataInRealmObject, true);
      traderObjectToModify.amountOwing -= transactionDataInRealmObject.amountPaid;
      traderObjectToModify.amountPaid += transactionDataInRealmObject.amountPaid;
      if (!traderIsUpdated) {
        traderObjectToModify.isUpdated = false;
      }
    });
    return null;
  } catch (error) {
    return null;
  }
}

export async function uploadTransactionRecordOnServer(
  transactionDataInServerFormat,
  transactionDataInRealmObject,
) {
  try {
    await axios.post(`${constants.api.ROOT_URL}/transaction/payment`, {
      transactionDataInServerFormat,
    });
    const traderIsUpdated = true;
    const newRealmData = { ...transactionDataInRealmObject, isUpdated: true };
    await saveTransactionDataLocally(newRealmData, traderIsUpdated);
    return null;
  } catch (error) {
    //  console.log(error);
    const traderIsUpdated = false;
    return saveTransactionDataLocally(transactionDataInRealmObject, traderIsUpdated);
  }
}

export async function confirmPayment(
  psuedoId: string,
  tollCollectorId: Number,
  amountPaid: Number,
  isDailyToll: Number,
) {
  const traderDetails = await getTraderDetails(psuedoId);
  const transactionUUID = uuidV4();
  const transactionDataInServerFormat = await convertTransactionDataToServerFormat(
    traderDetails,
    tollCollectorId,
    transactionUUID,
    amountPaid,
    isDailyToll,
  );
  const transactionDataInRealmObject = await convertTransactionDataToRealmObject(
    traderDetails,
    tollCollectorId,
    transactionUUID,
    amountPaid,
    isDailyToll,
  );
  await uploadTransactionRecordOnServer(
    transactionDataInServerFormat,
    transactionDataInRealmObject,
  );
  return traderDetails;
}
