import { getRealmInstance } from '../../_shared/services';
import * as realmSchemas from '../../_shared/services/realmSchemas';

export async function fetchDebtors() {
  const realm = getRealmInstance();
  return realm.objects(realmSchemas.TraderSchema.name).filtered('amountOwing != 0');
}
