import { PermissionsAndroid } from 'react-native';
import axios from 'axios';
import uuidV4 from 'uuid/v4';
import * as realmSchema from '../../_shared/services/realmSchemas';
import {
  getTraderDetails,
  getMidnightDate,
  getTollCollectorDetails,
  getRealmInstance,
  consoleIndividualRealmObject,
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
    paid: 0,
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
    paid: 0,
  };
  return realmData;
}

export async function saveScannedDataLocally(scannedDataInRealmObject) {
  try {
    //  console.log(scannedDataInRealmObject);
    const realm = await getRealmInstance();
    realm.write(() => {
      realm.create(realmSchema.ScannedSchema.name, scannedDataInRealmObject, true);
    });
    return null;
  } catch (error) {
    return null;
  }
}

export async function uploadScannedRecordOnServer(
  scannedDataInServerFormat,
  scannedDataInRealmObject,
) {
  try {
    await axios.post(`${constants.api.ROOT_URL}/transaction/scan`, {
      scannedDataInServerFormat,
    });
    const newRealmData = { ...scannedDataInRealmObject, isUpdated: true };
    await saveScannedDataLocally(newRealmData);
    return null;
  } catch (error) {
    return saveScannedDataLocally(scannedDataInRealmObject);
  }
}

export async function requestCameraPermissions() {
  try {
    const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (response === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export async function processBarCodeRead(psuedoId: string, tollCollectorId: Number) {
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

  await uploadScannedRecordOnServer(scannedDataInServerFormat, scannedDataInRealmObject);
  return traderDetails;
}
