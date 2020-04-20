import axios from 'axios';
import uuidV4 from 'uuid/v4';
import * as realmSchemas from '../../_shared/services/realmSchemas';
import {
  getTraderDetails,
  getMidnightDate,
  getTollCollectorDetails,
  getRealmInstance,
  scannedForToday,
} from '../../_shared/services';
import { constants } from '../../_shared/constants';

export async function convertScannedDataToServerFormat(
  traderDetails,
  tollCollectorId,
  scanndedUUID,
) {
  const today = new Date();
  const millisecondsDate = Date.parse(getMidnightDate(today));
  const serverData = {
    psuedoId: scanndedUUID,
    traderId: traderDetails.psuedoId,
    tollCollectorId,
    marketId: traderDetails.market.id,
    assemblyId: traderDetails.assembly.id,
    sectionId: traderDetails.section.id,
    date: millisecondsDate,
  };

  // consoleIndividualRealmObject(serverData);
  //  console.log(`serverData: ${serverData}`);
  return serverData;
}

export async function convertScannedDataToRealmObject(traderDetais, tollCollectorId, scanndedUUID) {
  const today = new Date();
  const millisecondsDate = Date.parse(await getMidnightDate(today));
  const realmData = {
    psuedoId: scanndedUUID,
    assembly: traderDetais.assembly,
    market: traderDetais.market,
    section: traderDetais.section,
    tollCollector: await getTollCollectorDetails(tollCollectorId),
    trader: traderDetais,
    date: millisecondsDate,
  };
  return realmData;
}

export async function saveScannedDataLocally(scannedDataInRealmObject, ticketPrice) {
  try {
    //  console.log(scannedDataInRealmObject);
    const realm = await getRealmInstance();
    const traderObjectToModify = realm
      .objects(realmSchemas.TraderSchema.name)
      .filtered(`psuedoId = '${scannedDataInRealmObject.trader.psuedoId}'`)[0];
    realm.write(() => {
      realm.create(realmSchemas.ScannedSchema.name, scannedDataInRealmObject, true);
      traderObjectToModify.amountOwing += ticketPrice;
    });
    return null;
  } catch (error) {
    return null;
  }
}

export async function uploadScannedRecordOnServer(
  scannedDataInServerFormat,
  scannedDataInRealmObject,
  ticketPrice,
) {
  try {
    await axios.post(`${constants.api.ROOT_URL}/transaction/scan`, {
      scannedDataInServerFormat,
      ticketPrice,
    });
    const newRealmData = { ...scannedDataInRealmObject, isUpdated: true };
    await saveScannedDataLocally(newRealmData, ticketPrice);
    return null;
  } catch (error) {
    return saveScannedDataLocally(scannedDataInRealmObject, ticketPrice);
  }
}

export async function processBarCodeRead(
  psuedoId: string,
  tollCollectorId: Number,
  ticketPrice: Number,
) {
  const traderDetails = await getTraderDetails(psuedoId);
  const scanndedUUID = uuidV4();
  const scannedDataInServerFormat = await convertScannedDataToServerFormat(
    traderDetails,
    tollCollectorId,
    scanndedUUID,
  );
  const scannedDataInRealmObject = await convertScannedDataToRealmObject(
    traderDetails,
    tollCollectorId,
    scanndedUUID,
  );

  await uploadScannedRecordOnServer(
    scannedDataInServerFormat,
    scannedDataInRealmObject,
    ticketPrice,
  );
  return traderDetails;
}

/* This code is used to check if shop has been scanned
 **We fitst check on the server if it has been scanned
 **If it fails then we check the realm data
 */
export async function checkIfShopIsScanned(psuedoId: string) {
  const traderDetails = await getTraderDetails(psuedoId);
  const today = new Date();
  const millisecondsDate = Date.parse(getMidnightDate(today));
  try {
    const response = await axios.post(`${constants.api.ROOT_URL}/transaction/scannedCheck`, {
      psuedoId,
      millisecondsDate,
    });
    if (response.data.status) return { isScanned: true, shopData: traderDetails };
    return null;
  } catch (error) {
    const isScanned = await scannedForToday(psuedoId);
    return { isScanned, shopData: traderDetails };
  }
}
