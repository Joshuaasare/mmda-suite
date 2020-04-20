import { getRealmInstance, consoleIndividualRealmObject } from '../../_shared/services';
import * as realmSchemas from '../../_shared/services/realmSchemas';

export async function fetchScannedAndTransactionHistory(millisecondsDate) {
  const realm = await getRealmInstance();
  const scannedHistory = realm
    .objects(realmSchemas.ScannedSchema.name)
    .filtered(`date = ${millisecondsDate}`);
  const transactionHistory = realm
    .objects(realmSchemas.TransactionSchema.name)
    .filtered(`date = ${millisecondsDate}`);
  //  consoleIndividualRealmObject(scannedHistory);
  //  consoleIndividualRealmObject(transactionHistory);
  return { scannedHistory, transactionHistory };
}
